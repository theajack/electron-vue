<template>
  <div id="wrapper">
    <input type="file" @change="onFileChange">
    <div>{{result}}</div>
    <button @click="sendMsgSync">sendMsgSync</button>
    <button @click="sendMsg">sendMsg</button>
  </div>
</template>

<script>
import { MSG_TYPE } from '../../constant';
// import SystemInformation from './LandingPage/SystemInformation';
import {postMessageSync, postMessage} from '../lib/message';
import {handleExcelData} from '../lib/util';
console.log('landing-page');
export default {
    name: 'landing-page',
    // components: { SystemInformation },
    data () {
        return {
            result: ''
        };
    },
    methods: {
        onFileChange (event) {
            handleExcelData(event.target.files[0], (res) => {
                this.result = JSON.stringify(res.results);
            });
        },
        sendMsgSync () {
            const result = postMessageSync(MSG_TYPE.TEST_SYNC_MSG);
            console.log(result);
        },
        sendMsg () {
            postMessage(MSG_TYPE.TEST_ASYNC_MSG, {
                a: 'aaa'
            }, (replyData) => {
                console.log(replyData);
            });

            // console.log(replyData);
        }
    }
};
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body { font-family: 'Source Sans Pro', sans-serif; }

  #wrapper {
    background:
      radial-gradient(
        ellipse at top left,
        rgba(255, 255, 255, 1) 40%,
        rgba(229, 229, 229, .9) 100%
      );
    height: 100vh;
    padding: 20px;
    width: 100vw;
  }

  #logo {
    height: auto;
    margin-bottom: 20px;
    width: 420px;
  }

  main {
    display: flex;
    justify-content: space-between;
  }

  main > div { flex-basis: 50%; }

  .left-side {
    display: flex;
    flex-direction: column;
  }

  .welcome {
    color: #555;
    font-size: 23px;
    margin-bottom: 10px;
  }

  .title {
    color: #2c3e50;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 6px;
  }

  .title.alt {
    font-size: 18px;
    margin-bottom: 10px;
  }

  .doc p {
    color: black;
    margin-bottom: 10px;
  }

  .doc button {
    font-size: .8em;
    cursor: pointer;
    outline: none;
    padding: 0.75em 2em;
    border-radius: 2em;
    display: inline-block;
    color: #fff;
    background-color: #4fc08d;
    transition: all 0.15s ease;
    box-sizing: border-box;
    border: 1px solid #4fc08d;
  }

  .doc button.alt {
    color: #42b983;
    background-color: transparent;
  }
</style>
