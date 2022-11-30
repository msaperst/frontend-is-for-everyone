// React
import { useState, useEffect } from 'react';

// App Component
import InstanceTable from './InstanceTable';

// Amplify UI
import '@aws-amplify/ui-react/styles.css';
import {
    Button,
    Card,
    Flex,
    Heading,
    TextAreaField,
    ToggleButtonGroup,
    ToggleButton,
    View,
    defaultDarkModeOverride,
    ThemeProvider,
} from '@aws-amplify/ui-react';

import './App.css';

// Amplify
import { Amplify } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import awsExports from './aws-exports';
Amplify.configure(awsExports);

const theme = {
    name: 'my-theme',
    overrides: [defaultDarkModeOverride],
};

function App({ user, signOut }) {
    const [colorMode, setColorMode] = useState('system');
    const [instances, setInstances] = useState([]);

    // Set initial list of instances
    useEffect(() => {
        const initialInstances = [
            {
                InstanceId: 1,
                LaunchTime: new Date().toLocaleDateString(),
                PrivateIpAddress: '10.16.1.100',
                PublicIpAddress: '100.100.100.100',
                State: {
                    Name: 'running',
                },
                Tags: [{ Key: 'owner', Value: 'User' }],
            },
            {
                InstanceId: 2,
                LaunchTime: new Date().toLocaleDateString(),
                PrivateIpAddress: '10.16.1.101',
                PublicIpAddress: '100.100.100.101',
                State: {
                    Name: 'running',
                },
                Tags: [{ Key: 'owner', Value: 'User' }],
            },
        ];
        setInstances(initialInstances);
    }, []);

    // Add a new row to the instances state
    function launchInstance() {
        const maxId = Math.max(...instances.map((i) => i.InstanceId));
        setInstances([
            ...instances,
            {
                InstanceId: isFinite(maxId) ? maxId + 1 : 1,
                LaunchTime: new Date().toLocaleDateString(),
                PrivateIpAddress: '10.16.1.101',
                PublicIpAddress: '100.100.100.101',
                State: {
                    Name: 'running',
                },
                Tags: [{ Key: 'owner', Value: 'User' }],
            },
        ]);
    }

    // Remove a row from the instances state based on id
    function removeRow(id) {
        setInstances(instances.filter((i) => i.InstanceId !== parseInt(id)));
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
                    <View style={{ marginBottom: '20px' }}>
                        <Button onClick={() => launchInstance()}>
                            Launch Instance
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
                        terminateFn={removeRow}
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
                <TextAreaField
                    value={JSON.stringify(user, null, 2)}
                    descriptiveText="User object"
                    rows={15}
                    readOnly={true}
                    width="100%"
                    resize="vertical"
                />
            </Card>
        </ThemeProvider>
    );
}

export default withAuthenticator(App);
