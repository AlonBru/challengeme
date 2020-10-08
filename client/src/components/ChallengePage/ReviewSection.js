import React, {useEffect, useState} from "react";
import Review from "./Review.js";
import axios from "axios";

const data = [{author:"author", title:"title", createdAt:"date", content:"sadsadsadasdasd", rating:4}];

function ReviewSection() {
	
	const [revArr, setRevArr] = useState([]);

	const getReviews = async () => {
		// const reviews = await axios.get(`/`).then((res) => res.data);
		const reviews = data;
		const filteredRevs = reviews.filter(item => item.title !== undefined && item.content !== undefined);
		setRevArr(filteredRevs);
	}

	useEffect(() => {
		getReviews();
	}, []);

	return (
		<div>
			{revArr.map((item,i)=> 
						<Review className="review" key={i} 
						author = {item.author} 
						createdAt = {item.createdAt} 
						title = {item.title}
						content = {item.content}
						rating = {item.rating}/>)}
		</div>
	);
}

export default ReviewSection;
