import React from 'react';
import { StyleSheet, Text, View,TouchableOpacity,Image,TextInput } from 'react-native';
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner';
export default class Transactionscreen extends React.Component{
    constructor(){
        super();
        this.state={
            hasCameraPermissions:null,
            scan:false,
            scandata:'',
            butttonState:'normal',
            scanbookid:'',
            scanstudentid:'',
        };

    }
  getCameraPermissions=async(id)=>{
      const {status}=await Permissions.askAsync(Permissions.CAMERA)
      this.setState({
          hasCameraPermissions:status==="granted",
          scan:false,
          butttonState:id
      })
  }  
  handlebarcodescanner=async({type,data})=>{
this.setState({
scan:true,
scandata:data,
butttonState:'normal'
})
  }
render(){
    const hasCameraPermissions=this.state.hasCameraPermissions;
const scan=this.state.scan;
const butttonState=this.state.butttonState;
if(butttonState!=="normal"&& hasCameraPermissions){
return(
    <BarCodeScanner onBarCodeScanned={scan?undefined:this.handlebarcodescanner}
    style={StyleSheet.absoluteFillObject}/>
)
}
else if(butttonState==='normal'){


return(

<View style={styles.container}>
    <View>
        <Image source={require('../assets/booklogo.jpg')}style={{width:100,height:100}}/>
        <Text style={{fontSize:23,textAlign:'center'}}>The Library App</Text>
        
        
    </View>
<View style={styles.inputView}>
    <TextInput style={styles.inputBox}
    placeholder="bookid" value={this.state.scanbookid}/>
    <TouchableOpacity style={styles.scanButton} onPress={()=>{
        this.getCameraPermissions("bookid");
    }}>
<Text style={styles.buttonText}>scan</Text>
    </TouchableOpacity>
    <TextInput style={styles.inputBox}
    placeholder="studentid"  value={this.state.scanstudentid}/>
    <TouchableOpacity style={styles.scanButton} onPress={()=>{
        this.getCameraPermissions("studentid");
    }}>
<Text style={styles.buttonText}>scan</Text>
    </TouchableOpacity>
</View>
   
</View>


)
}
}


}
const styles = StyleSheet.create({ container: 
    { flex: 1,
         justifyContent: 'center', 
         alignItems: 'center' },
          displayText:{ fontSize: 15,
             textDecorationLine: 'underline' }, 
             scanButton:{ backgroundColor: '#2196F3',
              padding: 10, 
              margin: 10 },
               buttonText:{ fontSize: 15,
                 textAlign: 'center',
                  marginTop: 10 },
                   inputView:{ flexDirection: 'row', margin: 20 },
                    inputBox:{ width: 100,
                         height: 40,
                          borderWidth: 1.5, 
                          borderRightWidth: 0, 
                          fontSize: 20,margin:20 }, 
                          scanButton:{ backgroundColor: '#66BB6A', 
                          width: 50, 
                          borderWidth: 1.5,
                           borderLeftWidth: 0 } });
