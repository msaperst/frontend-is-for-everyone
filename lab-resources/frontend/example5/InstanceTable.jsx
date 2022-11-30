// Amplify UI
import '@aws-amplify/ui-react/styles.css';
import {
    Button,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
} from '@aws-amplify/ui-react';

function toTitleCase(str) {
    return String(str).replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
}

export default function InstanceTable({
    instances,
    terminateFn,
    terminateAdditional,
}) {
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
                    <TableCell>{toTitleCase(i.State?.Name)}</TableCell>
                    <TableCell>
                        <Button
                            id={i.InstanceId}
                            size="small"
                            onClick={(e) => terminateFn(e.target.id)}
                            isDisabled={i.State?.Name !== 'running'}
                            {...terminateAdditional}
                        >
                            Terminate
                        </Button>
                    </TableCell>
                </TableRow>
            );
        });
    }

    return (
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
    );
}
