import './App.css';

function App() {
    return (
        <div style={{ justifyContent: 'center', textAlign: 'center' }}>
            <header style={{ marginBottom: '20px' }}>
                <h1>Welcome user!</h1>
                <button onClick={() => alert('Launching instance')}>
                    Launch Instance
                </button>
                <button
                    onClick={() => alert('Sign Out')}
                    style={{ marginLeft: '20px' }}
                >
                    Sign Out
                </button>
            </header>
            <table style={{ width: '100%' }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Launch Date</th>
                        <th>Launched By</th>
                        <th>Private IP</th>
                        <th>Public IP</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>{new Date().toLocaleDateString()}</td>
                        <td>User</td>
                        <td>10.16.1.100</td>
                        <td>100.100.100.100</td>
                        <td>Running</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>{new Date().toLocaleDateString()}</td>
                        <td>User</td>
                        <td>10.16.1.101</td>
                        <td>100.100.100.101</td>
                        <td>Running</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default App;
