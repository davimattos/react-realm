import Reactotron from 'reactotron-react-native';
import { NativeModules } from 'react-native';

const { scriptURL } = NativeModules.SourceCode;
const address = scriptURL.split('://')[1].split('/')[0];
const host = address.split(':')[0];

if (__DEV__) {
  const tron = Reactotron.configure({ port: 9090, host })
    .useReactNative()
    .connect();

  console.tron = tron;

  tron.clear();
}
