import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import AuditLogsTable from 'components/sections/audit-logs/AuditLogsTable';

const AuditLogs = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }} gutterBottom>
          System Audit Logs
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Detailed history of user logins, signups, and administrative actions.
        </Typography>
      </Box>

      <Paper sx={{ p: 0, borderRadius: 2, overflow: 'hidden' }}>
        <AuditLogsTable />
      </Paper>
    </Box>
  );
};

export default AuditLogs;
