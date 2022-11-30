import { useState, useEffect } from 'react';

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
    const [isSigningOut, setIsSigningOut] = useState(false);
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
                    Name: 'Running',
                },
                Tags: [{ Key: 'owner', Value: 'User' }],
            },
            {
                InstanceId: 2,
                LaunchTime: new Date().toLocaleDateString(),
                PrivateIpAddress: '10.16.1.101',
                PublicIpAddress: '100.100.100.101',
                State: {
                    Name: 'Running',
                },
                Tags: [{ Key: 'owner', Value: 'User' }],
            },
        ];
        setInstances(initialInstances);
    }, []);

    // Return table rows of instances
    function InstanceRows() {
        return instances.map((i) => {
            return (
                <TableRow key={i.InstanceId}>
                    <TableCell>{i.InstanceId}</TableCell>
                    <TableCell>{i.LaunchTime}</TableCell>
                    <TableCell>
                        {i.Tags.find((t) => t.Key === 'owner')?.Value}
                    </TableCell>
                    <TableCell>{i.PrivateIpAddress}</TableCell>
                    <TableCell>{i.PublicIpAddress}</TableCell>
                    <TableCell>{i.State?.Name}</TableCell>
                    <TableCell>
                        <Button
                            id={i.InstanceId}
                            size="small"
                            onClick={(e) => terminateInstance(e.target.id)}
                        >
                            Terminate
                        </Button>
                    </TableCell>
                </TableRow>
            );
        });
    }

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
                    Name: 'Running',
                },
                Tags: [{ Key: 'owner', Value: 'User' }],
            },
        ]);
    }

    // Remove a row from the instances state based on id
    function terminateInstance(id) {
        setInstances(instances.filter((i) => i.InstanceId.toString() !== id));
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
                    <Heading level={2}>Welcome user!</Heading>
                    <View style={{ marginBottom: '20px' }}>
                        <Button onClick={() => launchInstance()}>
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
                    {isSigningOut && (
                        <Button
                            onClick={() => {
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
                                <TableCell as="th"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <InstanceRows />
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