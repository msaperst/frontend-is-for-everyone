import { useState } from 'react';

// Amplify UI
import '@aws-amplify/ui-react/styles.css';
import {
    Button,
    Card,
    Flex,
    Heading,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    ToggleButtonGroup,
    ToggleButton,
    View,
    defaultDarkModeOverride,
    ThemeProvider,
} from '@aws-amplify/ui-react';

import './App.css';

const theme = {
    name: 'my-theme',
    overrides: [defaultDarkModeOverride],
};

function App() {
    const [colorMode, setColorMode] = useState('system');
    const [isLaunching, setIsLaunching] = useState(false);
    const [isSigningOut, setIsSigningOut] = useState(false);

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
                    <Heading level={2}>Welcome user!</Heading>
                    <View style={{ marginBottom: '20px' }}>
                        <Button
                            loadingText="Launching..."
                            isLoading={isLaunching}
                            onClick={() => setIsLaunching(true)}
                        >
                            Launch Instance
                        </Button>
                        <Button
                            loadingText="Signing Out..."
                            isLoading={isSigningOut}
                            onClick={() => setIsSigningOut(true)}
                            style={{ marginLeft: '20px' }}
                        >
                            Sign Out
                        </Button>
                    </View>
                    {(isLaunching || isSigningOut) && (
                        <Button
                            onClick={() => {
                                setIsLaunching(false);
                                setIsSigningOut(false);
                            }}
                        >
                            Reset
                        </Button>
                    )}
                    <Table highlightOnHover={true} variation="striped">
                        <TableHead>
                            <TableRow>
                                <TableCell as="th">ID</TableCell>
                                <TableCell as="th">Launch Date</TableCell>
                                <TableCell as="th">Launched By</TableCell>
                                <TableCell as="th">Private IP</TableCell>
                                <TableCell as="th">Public IP</TableCell>
                                <TableCell as="th">Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>1</TableCell>
                                <TableCell>
                                    {new Date().toLocaleDateString()}
                                </TableCell>
                                <TableCell>User</TableCell>
                                <TableCell>10.16.1.100</TableCell>
                                <TableCell>100.100.100.100</TableCell>
                                <TableCell>Running</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>2</TableCell>
                                <TableCell>
                                    {new Date().toLocaleDateString()}
                                </TableCell>
                                <TableCell>User</TableCell>
                                <TableCell>10.16.1.101</TableCell>
                                <TableCell>100.100.100.101</TableCell>
                                <TableCell>Running</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
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

export default App;
