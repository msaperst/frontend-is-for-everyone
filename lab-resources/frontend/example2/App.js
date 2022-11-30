import './App.css';

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
    View,
} from '@aws-amplify/ui-react';

function App() {
    return (
        <Card height="100vh">
            <Flex
                direction="column"
                justifyContent="flex-start"
                alignItems="center"
                alignContent="flex-start"
                wrap="nowrap"
                gap="5px"
            >
                <Heading level={2}>Welcome user!</Heading>
                <View style={{ marginBottom: '20px' }}>
                    <Button onClick={() => alert('Launching instance')}>
                        Launch Instance
                    </Button>
                    <Button
                        onClick={() => alert('Sign Out')}
                        style={{ marginLeft: '20px' }}
                    >
                        Sign Out
                    </Button>
                </View>
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
            </Flex>
        </Card>
    );
}

export default App;
