import { useState, type ChangeEvent } from 'react';
import { useReports } from '../api/hooks/useReports';
import Header from '../features/Layout/Header';
import { Box } from '../ui/Box';
import Button from '../ui/Button';
import Input from '../ui/Input';

export default function Reports() {
  const { getReport, loadingReport, emailReport, isEmailingReport } =
    useReports();

  const [email, setEmail] = useState('tasanchez@nhac.org');
  const [isDisabled, setIsDisabled] = useState(false);

  async function sendReport() {
    await emailReport(email, '/path_to_report');
  }

  function emailChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setIsDisabled(!value || /^[^@]+@[^@]+\.[^@]+$/.test(email) == false);
    setEmail(e.target.value);
  }

  return (
    <Box>
      <Header>Reports</Header>
      <Box className="flex flex-col gap-20">
        <Button
          variation="primary"
          onClick={getReport}
          disabled={loadingReport}
          className="w-1/8"
        >
          Run Report
        </Button>
        <Box className="grid grid-cols-2 w-1/3">
          <div className="p-2">Recipient Email</div>
          <Box>
            <div className="flex justify-between">
              <Input
                type="email"
                onChange={emailChange}
                value={email}
                placeholder="Enter an email"
              ></Input>
            </div>
          </Box>
          <Button
            className="mt-3"
            onClick={sendReport}
            disabled={isDisabled || isEmailingReport}
            variation="primary"
          >
            <div className="">Email Report</div>
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
