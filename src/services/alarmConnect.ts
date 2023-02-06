import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

import { loadItem } from './storage';

const AlarmConnect = () => {
  const [listening, setListening] = useState(false);
  const [data, setData] = useState('');
  const id = loadItem('userId');
  const token = loadItem('isLogin');
  const tokens = token?.substring(7);

  useEffect(() => {
    if (!listening) {
      const subscribeUrl = `https://sparta-hippo.shop/api/alarm/subscribe?token=${tokens}`;
      // const subscribeUrl = `https://sparta-hippo.shop/api/alarm/subscribe/${id}`;
      const eventSource = new EventSource(subscribeUrl);

      eventSource.addEventListener('sse', async (e: any) => {
        const result = await e.data;
        console.log('sse연결 확인용', result);
        // setData(result);
        setListening(true);
      });

      eventSource.addEventListener('alarm', async (e: any) => {
        const result = await e.data;
        console.log('alarm모든알람', result);
        setData(result);
        setListening(true);
      });

      eventSource.addEventListener('error', function () {
        eventSource.close();
      });
    }
  }, [data]);

  console.log(data);
  if (data.split(',')[1] !== undefined) {
    toast(data.split(',')[1].split(':')[1]);
  }
};
export default AlarmConnect;
