import { ScrollView, StyleSheet, Text, View } from 'react-native';
import './Main.css';
import { SendOutlined } from '@ant-design/icons';
import { Col, InputNumber, Row, Slider, Space, Button } from 'antd';
import { useEffect, useState, useRef,forwardRef } from 'react';
import { Card } from 'react-native-paper';
import { Provider as PaperProvider, TextInput } from 'react-native-paper';
import { signInWithCustomToken } from "firebase/auth";
import { ref, push, serverTimestamp, query, orderByChild, equalTo, limitToLast } from "firebase/database";
import { httpsCallable } from 'firebase/functions';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useList } from 'react-firebase-hooks/database';
import { firebaseToken, auth, database, functions } from '../Firebase';
import tem from '../images/temprature.png'
import humi from '../images/Humidity.png'




  const Add = ({ user }) => {
  
    const [text, setText] = useState("");
  
    return (
      <View style={{ display: 'flex', flexDirection: 'row'}}>
        <TextInput style={{ margin: 10 }}
          label="Message"
          value={text}
          onChangeText={text => setText(text)}
        ></TextInput>
        <Button className='btn-send' type="primary" icon={<SendOutlined />} onClick={() => {
          push(ref(database, "data"), {
            userId: user.uid,
            groupId: 20,
            timestamp: serverTimestamp(),
            type: "str",
            string: text.toString()
          });
        }}>
          post
        </Button>
      </View>
    )
  }

  const Messages = (props) => {
    return (
      <ScrollView style={{ margin: 50 }}>
        {props.messages.map((el, i) =>
          <CardComponent key={i} message={el} iMax={props.messages.length} i={i}></CardComponent>
        )}
      </ScrollView>
    )
  }
  const CardComponent = ({ message, i, iMax }) => (
    <Card style={{
      marginLeft: 10, marginRight: 10, marginTop: 10, marginBottom: 10 }}>
      <Card.Title title={message} />
    </Card>
    // <div className='card'>
    //     <text>{message}</text>
    // </div>
  );



  const IntegerStep = forwardRef((props,ref) => {


    const [inputValue, setInputValue] = useState(1);    
    const onChange = (newValue) => {
      setInputValue(newValue);
      props.onChange(newValue);
    };

    return (
      <Row style={{width:'100%',marginLeft:'20%',marginBottom:'5%'}}>
        <Col style={{width:'15%',marginTop:'1%'}}>
            <Text>{props.feature}</Text>
        </Col>
        <Col style={{width:'50%'}}>
          <Slider
            min={0}
            max={props.limit}
            onChange={onChange}
            value={typeof inputValue === 'number' ? inputValue : 0}
          />
        </Col>
        <Col >
          <InputNumber 
            style={{
              margin: '0 16px',
            }}
            ref = {ref}
            value={inputValue}
            onChange={onChange}
          />
        </Col>
      </Row>

    );
  }) 
  

const DisplayData = (props) => {

  return(

    <Col>
      <Row className='display-row'>
        <img src={tem} className='icon-font'></img>
        <text className='text'>Outside </text>
      </Row>
      <Row className='display-row'>
        <img src={tem} className='icon-font'></img>
        <text className='text'>Inside</text>
        </Row>
      <Row className='display-row'>
        <img src={humi} className='icon-font'></img>
        <text className='text'>Outside</text>
        </Row>
      <Row className='display-row'>
        <img src={humi} className='icon-font'></img>
        <text className='text'>Inside</text>
        </Row>
    </Col>
  );
}  


export default function Main({navigation}){
    const [user, authLoading, authError] = useAuthState(auth);

    // const hueRef = useRef();
    const [hueValue, setHueValue] = useState(0);
    const [satValue, setSatValue] = useState(0);
    const [briValue, setBriValue] = useState(0);

    const hueSet = (val) => {
        setHueValue(val)
    }
    const satSet = (val) => {
        setSatValue(val)
    }
    const briSet = (val) => {
        setBriValue(val)
    }


    useEffect(() => {
        (async () => {
          const getToken = httpsCallable(functions, "getToken");
          const token = await getToken({ token: firebaseToken });
          if (token?.data?.result === "ok" && token?.data?.token) {
            signInWithCustomToken(auth, token.data.token);
          } else {
            console.error(token?.data?.reason ?? "unknownError")
          }
        })();
      }, []);
    
      const [snapshots, dbLoading, dbError] = useList(user ? query(ref(database, 'data'), orderByChild('groupId'), equalTo(20), limitToLast(3)) : null);
    
      const [temOut, dbLoading2, dbError2] = useList(user ? query(ref(database, 'data'), orderByChild('groupId'), equalTo(1), limitToLast(1)) : null);
      const [temIn, dbLoading3, dbError3] = useList(user ? query(ref(database, 'data'), orderByChild('groupId'), equalTo(2), limitToLast(1)) : null);
      const [humiOut, dbLoading4, dbError4] = useList(user ? query(ref(database, 'data'), orderByChild('groupId'), equalTo(11), limitToLast(1)) : null);
      const [humiIn, dbLoading5, dbError5] = useList(user ? query(ref(database, 'data'), orderByChild('groupId'), equalTo(12), limitToLast(1)) : null);



    return(
        <div className='main-container'>
            <div className='message-part'>
                <div className='message-left'>
                    <div className='header-box'>
                        <h1>GFB</h1>
                    </div>
                    <div className='input-box'>
                        <Add user={user}></Add>
                    </div>
                </div>
                <div className='message-right'>
                        {snapshots ?
                        <Messages messages={snapshots.map(el => el?.val()?.string ?? '')}></Messages>
                        : null}
                </div>
            </div>
            <div className='control-part'>
                <div className='light-part'>
                   <div style={styles.bgColor}></div>

                <IntegerStep feature = "Hue" limit = {360} onChange={hueSet}/>
                <IntegerStep feature = "Saturation" limit = {100} onChange={satSet}/>
                <IntegerStep feature = "Brightness" limit = {100} onChange={briSet}/>
                <Button style={{marginBottom:'5%'}} type="primary" onClick={()=>{
                  console.log(hueValue+ " "+satValue+" "+briValue)
                }}>Check the Color</Button>

                <Button type="primary" onClick={() => {
                    push(ref(database, "data"), {
                        userId: user.uid,
                        groupId: 21,
                        timestamp: serverTimestamp(),
                        type: "int",
                        integer: hueValue
                    });
                    push(ref(database, "data"), {
                        userId: user.uid,
                        groupId: 22,
                        timestamp: serverTimestamp(),
                        type: "int",
                        integer: satValue
                    });
                    push(ref(database, "data"), {
                        userId: user.uid,
                        groupId: 23,
                        timestamp: serverTimestamp(),
                        type: "int",
                        integer: briValue
                    });
                    
                    

                }}>Change the Light</Button>
                </div>
                <div  className='display-box'>
                  <Col>
                    <Row className='display-row'>
                      <img src={tem} className='icon-font'></img>
                      <Text style={{ marginLeft:'5%', color: 'white', fontSize:'x-large', marginTop:'5%'}}>Outside</Text>
                      {temOut ?
                      <Text style={{fontWeight:'bold', marginLeft:'5%', color: 'white', fontSize:'x-large', marginTop:'5%'}}>{temOut.map(el => el?.val()?.integer ?? '')}</Text>
                        : null}
                    </Row>
                    <Row className='display-row'>
                      <img src={tem} className='icon-font'></img>
                      <Text style={{ marginLeft:'5%', color: 'white', fontSize:'x-large', marginTop:'5%'}}>Inside</Text>
                      {temIn ?
                      <Text style={{fontWeight:'bold', marginLeft:'5%', color: 'white', fontSize:'x-large', marginTop:'5%'}}>{temIn.map(el => el?.val()?.integer ?? '')}</Text>
                        : null}
                      </Row>
                    <Row className='display-row'>
                      <img src={humi} className='icon-font'></img>
                      <Text style={{ marginLeft:'5%', color: 'white', fontSize:'x-large', marginTop:'5%'}}>Outside</Text>
                      {humiOut ?
                      <Text style={{fontWeight:'bold', marginLeft:'5%', color: 'white', fontSize:'x-large', marginTop:'5%'}}>{humiOut.map(el => el?.val()?.integer ?? '')}</Text>
                        : null}
                      </Row>
                    <Row className='display-row'>
                      <img src={humi} className='icon-font'></img>
                      <Text style={{ marginLeft:'5%', color: 'white', fontSize:'x-large', marginTop:'5%'}}>Inside</Text>
                      {humiIn ?
                      <Text style={{fontWeight:'bold', marginLeft:'5%', color: 'white', fontSize:'x-large', marginTop:'5%'}}>{humiIn.map(el => el?.val()?.integer ?? '')}</Text>
                        : null}
                      </Row>
                  </Col>

                </div>
            </div>
        </div>

    )
}

const styles = StyleSheet.create({
    bgColor: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: ''
    },
  });