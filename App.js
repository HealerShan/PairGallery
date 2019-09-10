import React from "react";
import {
StyleSheet,
View,
ActivityIndicator,
FlatList,
Text,
Image,
Button,
TouchableOpacity
} from "react-native";
import ImageView from 'react-native-image-view'

export default class Source extends React.Component {
static navigationOptions = ({ navigation }) => {
return {
  title: "Source Listing",
  headerStyle: {backgroundColor: "#fff"},
  headerTitleStyle: {textAlign: "center",flex: 1}
 };
};
constructor(props) {
 super(props);
 this.state = {
   loading: true,
   dataSource:[]
  };
}
componentDidMount(){
fetch("https://api.unsplash.com/photos/?client_id=896d4f52c589547b2134bd75ed48742db637fa51810b49b607e37e46ab2c0043")
.then(response => response.json())
.then((responseJson)=> {
  this.setState({
   loading: false,
   dataSource: responseJson
  })
})
.catch(error=>console.log(error)) //to catch the errors if any
}



FlatListItemSeparator = () => {
return (
  <View style={{
     height: .5,
     width:"100%",
     backgroundColor:"rgba(0,0,0,0.5)",
}}
/>
);
}

onClick = (urls) =>{
  <Image source={{uri: urls}}
       resizeMode="cover"  />
}


renderItem=(data)=>
 <TouchableOpacity style={styles.list.Button} onPress={this.onClick(data.item.urls.small)}>
  <Image source={{uri: data.item.urls.small}}
       style={{width: 50, height: 60}} />  
  <Text style={styles.Text}>{data.item.user.name}</Text>
  <Text style={styles.Text}>{data.item.description}</Text>

 </TouchableOpacity>
render(){
 if(this.state.loading){
  return( 
    <View style={styles.loader}> 
      <ActivityIndicator size="large" color="#0c9"/>
    </View>
    
)}
return(
 <FlatList style={styles.list}
    data= {this.state.dataSource}
    ItemSeparatorComponent = {this.FlatListItemSeparator}
    renderItem= {item=> this.renderItem(item)}
    keyExtractor= {item=>item.id.toString()}
 />

)
}
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#CEE165"
   },
  loader:{
    flex: 1,
    justifyContent: "space-around",
    alignItems: "stretch",
    backgroundColor: "#CEE165"
   },
  list:{
    paddingVertical: 10,
    margin: 10,
    backgroundColor: "#CEE165"
    
   },
   backgroundImage:{
     flex: 1,
     width: '100%'
   },
   Text:{
      color: "#3D0C02",
     
   }
});
