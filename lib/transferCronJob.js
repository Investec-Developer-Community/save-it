import axios from 'axios';
import { CronJob } from 'cron';

const transferCronJob = (amount, minRule, frequency) => {

  const job = new CronJob(`* ${frequency} * * * *`, async function() {
    await axios.post(
      `/api/checkBalances`,
      {
        amount,
        minRule
      });
  });

  job.start();
}

export default transferCronJob;
