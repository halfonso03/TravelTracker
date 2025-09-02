import { useState } from 'react';
import { useReports } from '../api/hooks/useReports';
import Header from '../features/Layout/Header';
import { Box } from '../ui/Box';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { BiSend } from 'react-icons/bi';

export default function Reports() {
  const { getReport, loadingReport, emailReport } = useReports();

  const [email, setEmail] = useState('tasanchez@nhac.org');

  async function sendReport() {
    await emailReport(email, '');
  }

  return (
    <Box className="">
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
        <Box className="flex">
          <Box className=" mr-2">Recipient Email</Box>
          <Box>
            <Input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="Enter an email"
            ></Input>
            <Box
              style={{
                backgroundColor: 'var(--color-brand-600)',
                border: '1px solid var(--color-brand-500)',
                cursor: 'pointer',
                padding: '.4rem 1rem',
              }}
              className={'mt-3 rounded-md  flex align-middle justify-between '}
              onClick={sendReport}
            >
              <div className="p-0 m-0">Email Report</div>
              <div className="self-center">
                <BiSend className="p-0 inline text-xl"></BiSend>
              </div>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
