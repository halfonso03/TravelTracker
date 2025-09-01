import { useReports } from '../api/hooks/useReports';
import Header from '../features/Layout/Header';
import { Box } from '../ui/Box';
import Button from '../ui/Button';

export default function Reports() {
  const { getReport, loadingReport } = useReports();

  return (
    <Box className="flex flex-col">
      <Header>Reports</Header>
      <Box>
        <Button
          variation="primary"
          onClick={getReport}
          disabled={loadingReport}
        >
          Run Report
        </Button>
      </Box>
    </Box>
  );
}
