// React
import { useState } from 'react';

// Amplify UI
import '@aws-amplify/ui-react/styles.css';
import {
    Button,
    Card,
    Flex,
    Heading,
    SwitchField,
    TextAreaField,
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

// Return the latest AMI ID (string) from a list of AMIs
function getLatestAmiId(amiData) {
    if (amiData?.length > 0) {
        return amiData
            .sort((a, b) => {
                return (
                    new Date(a.CreationDate).getTime() -
                    new Date(b.CreationDate).getTime()
                );
            })
            .reverse()[0]?.ImageId;
    } else {
        return null;
    }
}

function App({ user, signOut }) {
    const [colorMode, setColorMode] = useState('system');
    const [isLaunching, setIsLaunching] = useState(false);
    const [amiArch, setAmiArch] = useState('x86_64');
    const [amiData, setAmiData] = useState();

    async function handlGetAmi() {
        setIsLaunching(true);

        const apiName = 'vendorApi';
        const path = '/vendor/ami';
        const myInit = {
            queryStringParameters: {
                amiArch: amiArch,
            },
        };

        try {
            const apiResult = await API.get(apiName, path, myInit);
            const latestAmiId = getLatestAmiId(apiResult?.Images);
            setAmiData({ latestAmiId: latestAmiId, ...apiResult });
        } catch (e) {
            setAmiData(`Error getting AMI data: ${e}`);
        }
        
        setIsLaunching(false);
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
                        <SwitchField
                            onChange={() =>
                                setAmiArch(
                                    amiArch === 'x86_64' ? 'arm64' : 'x86_64'
                                )
                            }
                            isChecked={amiArch === 'x86_64' ? false : true}
                            label={amiArch}
                            labelPosition="start"
                        />
                        <Button
                            loadingText="Getting AMI data..."
                            isLoading={isLaunching}
                            onClick={() => handlGetAmi()}
                            style={{ marginLeft: '20px' }}
                        >
                            Get Amazon Linux 2 AMI Data
                        </Button>
                        <Button
                            onClick={() => signOut()}
                            style={{ marginLeft: '20px' }}
                        >
                            Sign Out
                        </Button>
                    </View>
                    <TextAreaField
                        value={JSON.stringify(amiData, null, '\t')}
                        descriptiveText="AMI data"
                        rows={15}
                        readOnly={true}
                        width="100%"
                        resize="vertical"
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
