import React, { Component } from 'react';
import { View } from 'react-native';

import { Spinner } from '../../components/common';

import { PostForm } from '../forms';

class HouseForm extends Component<{}>{
	constructor(props){
		super(props);
		this.state = {
			formStyle: this.props.formStyle,
			userId: this.props.user.uid,
			isLoading: false
		};
	}

	handleSubmitPost(key, userId, address, headline, squareFeet, price){
		if(!key){
			var getUrl = 'https://android-endpoint.appspot.com/home';
			if(!userId){
				alert("UserId error");
				return null;
			}
			if(!address){
				alert("Address error");
				return null;
			}
			if(!headline){
			alert("Headline error");
				return null;
			}
			if(!squareFeet){
				alert("Square Feet error " + typeof squareFeet);
				return null;
			}
			if(!price){
				alert("Price error " + typeof price);
				return null;
			}
		}else if(!userId && !address && !headline && !squareFeet && !price) {
			var getUrl = 'https://android-endpoint.appspot.com/home?homeId=' + key;
		}
		this.setState({
			isLoading: true
		});

		return fetch(getUrl, {
			method: 'POST',
			dataType: 'json',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				homeId: Math.random().toString(36).substr(2, 9),
				userId: userId,
				address: address,
				headline: headline,
				squareFeet: squareFeet,
				price: price,
			})
		})
			.then((res) => res.json())
			.then((responseJson) => {
				alert(JSON.stringify(responseJson));
				this.setState({
					isLoading: false
				});
				this.props.onPress();
			})
			.catch((error) => {
				console.error(error);
			});
	}

	handleSubmitPatch(key, userId, address, headline, squareFeet, price){
		if(!key){
			alert("key (patch) error");
		}else {
			var getUrl = 'https://android-endpoint.appspot.com/home?homeId=' + key;
		}
		this.setState({
			isLoading: true
		});

		return fetch(getUrl, {
			method: 'PATCH',
			dataType: 'json',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				userId: userId,
				address: address || null,
				headline: headline || null,
				squareFeet: squareFeet || null,
				price: price || null,
			})
		})
			.then((res) => res.json())
			.then((responseJson) => {
				alert(JSON.stringify(responseJson));
				this.setState({
					isLoading: false
				});
				this.props.onPress();
			})
			.catch((error) => {
				console.error(error);
			});
	}

	handleSubmitGet(key, userId){
		if(!key){
			alert("key (get) error");
		}else {
			var getUrl = 'https://android-endpoint.appspot.com/home?homeId=' + key;
			this.setState({
				isLoading: true
			});
	
			return fetch(getUrl, {
				method: 'GET',
				dataType: 'json',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					userId: userId
				})
			})
				.then((res) => res.json())
				.then((responseJson) => {
					alert(JSON.stringify(responseJson));
					this.setState({
							isLoading: false
					});
					this.props.onPress();
				})
				.catch((error) => {
					console.error(error);
				});
		}
	}

	renderForm(){
		if(this.state.isLoading === true){
			return <Spinner />
		}else{
			return <PostForm userId={this.state.userId} submitPost={this.handleSubmitPost.bind(this)} submitPatch={this.handleSubmitPatch.bind(this)} submitGet={this.handleSubmitGet.bind(this)} />
		}
	}

	render(){
		return(
			<View style={this.state.formStyle}>
				{this.renderForm()}
			</View>
		);
	}
}

export { HouseForm };
