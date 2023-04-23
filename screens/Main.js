import { Text, View } from 'react-native';
import './Main.css';
import { SendOutlined } from '@ant-design/icons';
import { Button } from 'antd';

export default function Main({navigation}){
    return(
        // <View >
        //     <Text>in Main</Text>
        // </View>
        <div className='main-container'>
            <div className='message-part'>
                <div className='message-left'>
                    <div className='header-box'>
                        <h1>GFB</h1>
                    </div>
                    <div className='input-box'>
                        <input type='text' style={{marginRight:"20px"}}></input>
                        <Button type="primary" icon={<SendOutlined />}>
                            Send
                        </Button>
                    </div>
                </div>
                <div className='message-right'>

                </div>
            </div>
        </div>

    )
}