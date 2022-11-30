// React
import { useState, useEffect, useMemo, useCallback } from 'react';

// App Component
import InstanceTable from './InstanceTable';

// Amplify UI
import '@aws-amplify/ui-react/styles.css';
import {
    Button,
    Card,
    Flex,
    Heading,
    ToggleButtonGroup,
    ToggleButton,
    View,
    defaultDarkModeOverride,
    ThemeProvider,
} from '@aws-amplify/ui-react';

import './App.css';

// Amplify
import { Amplify, API } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import awsExports from './aws-exports';
Amplify.configure(awsExports);

const theme = {
    name: 'my-theme',
    overrides: [defaultDarkModeOverride],
};

function App({ user, signOut }) {
    const [colorMode, setColorMode] = useState('system');
    const [isLaunching, setIsLaunching] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [isTerminating, setIsTerminating] = useState(false);
    const [instances, setInstances] = useState([]);

    const userId = useMemo(
        () => user.attributes?.email || user.username,
        [user]
    );

    // set instances to EC2 instances with a tag of user: id
    const refreshInstances = useCallback(async () => {
        setIsRefreshing(true);
        const apiName = 'vendorApi';
        const path = '/vendor/instance';
        const myInit = {
            queryStringParameters: {
                owner: userId,
            },
        };

        try {
            const apiResult = await API.get(apiName, path, myInit);
            const nonTerminatedInstances =
                apiResult.Reservations?.map((r) => r.Instances)
                    ?.flat()
                    ?.filter((r) => r.State?.Name !== 'terminated') || [];
            setInstances(nonTerminatedInstances);
        } catch (e) {
            alert(`Error refreshing instances: ${e}`);
        }

        setIsRefreshing(false);
    }, [userId]);

    // load instances initially
    useEffect(() => {
        refreshInstances();
    }, [refreshInstances]);

    // launch ec2 t2.nano instance with latest amazon linux 2 AMI
    async function handleLaunchInstance() {
        setIsLaunching(true);
        const apiName = 'vendorApi';
        const path = '/vendor/instance/launch';
        const myInit = {
            body: {
                owner: userId,
            },
        };
        try {
            await API.post(apiName, path, myInit);
            await refreshInstances();
        } catch (e) {
            alert(`Error launching instance: ${e}`);
        }

        setIsLaunching(false);
    }

    // terminate instance based on ID
    async function handleTerminateInstance(id) {
        setIsTerminating(true);
        const apiName = 'vendorApi';
        const path = '/vendor/instance/terminate';
        const myInit = {
            body: {
                instanceId: id,
            },
        };

        try {
            await API.post(apiName, path, myInit);
            await refreshInstances();
        } catch (e) {
            alert(`Error terminating instance: ${e}`);
        }

        setIsTerminating(false);
    }

    return (
        <ThemeProvider theme={theme} colorMode={colorMode}>
            <Card height="100vh">
                <Flex
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="center"
                    alignContent="flex-start"
                    wrap="nowrap"
                    gap="10px"
                >
                    <Heading level={2}>
                        Welcome {user.attributes?.email || user.username}!
                    </Heading>
                    <View>
                        <Button
                            loadingText="Launching instance"
                            isLoading={isLaunching}
                            onClick={() => handleLaunchInstance()}
                            style={{ marginLeft: '20px' }}
                        >
                            Launch
                        </Button>
                        <Button
                            loadingText="Refreshing..."
                            isLoading={isRefreshing}
                            onClick={() => refreshInstances(userId)}
                            style={{ marginLeft: '20px' }}
                        >
                            Refresh
                        </Button>
                        <Button
                            onClick={() => signOut()}
                            style={{ marginLeft: '20px' }}
                        >
                            Sign Out
                        </Button>
                    </View>
                    <InstanceTable
                        instances={instances}
                        terminateFn={handleTerminateInstance}
                        terminateAdditional={{
                            isLoading: isTerminating,
                        }}
                    />
                    <ToggleButtonGroup
                        value={colorMode}
                        isExclusive
                        onChange={(value) => setColorMode(value)}
                    >
                        <ToggleButton value="light">Light</ToggleButton>
                        <ToggleButton value="dark">Dark</ToggleButton>
                        <ToggleButton value="system">System</ToggleButton>
                    </ToggleButtonGroup>
                </Flex>
            </Card>
        </ThemeProvider>
    );
}

export default withAuthenticator(App);
