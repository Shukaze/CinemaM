import React, { useState } from 'react'
import { Typography, Form, message, Icon } from 'antd';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import FileUpload from '../../Utils/FileUpload'
import Axios from 'axios';



const genres = [
    { key: 1, value: "Action" },
    { key: 2, value: "Horror" },
    { key: 3, value: "Fantasy" },
    { key: 4, value: "Comedy" },
    { key: 5, value: "Thriller" },
    { key: 6, value: "Drama" },
    { key: 7, value: "Animation" }
]

function UploadMoviePage(props) {

    const [TitleValue, setTitleValue] = useState("")
    const [DescriptionValue, setDescriptionValue] = useState("")
    const [RateValue, setRateValue] = useState("")
    const [TrailerLinkValue, setTrailerLinkValue] = useState("")
    const [MovieLengthValue, setMovieLengthValue] = useState("")
    const [numberInStocksValue, setNumberInStocksValue] = useState(0)
    const [GenresValue, setGenresValue] = useState(1)

    const [Images, setImages] = useState([])


    const onTitleChange = (event) => {
        setTitleValue(event.currentTarget.value)
    }

    const onDescriptionChange = (event) => {
        setDescriptionValue(event.currentTarget.value)
    }

    const onNumberInStocksChange = (event) => {
        setNumberInStocksValue(event.currentTarget.value)
    }

    const onGenresSelectChange = (event) => {
        setGenresValue(event.currentTarget.value)
    }

    const onRateChange = (event) => {
        setRateValue(event.currentTarget.value)
    }

    const onTrailerChange = (event) => {
        setTrailerLinkValue(event.currentTarget.value)
    }

    const onMoviesLengthChange = (event) => {
        setMovieLengthValue(event.currentTarget.value)
    }

    const updateImages = (newImages) => {
        console.log(newImages);
                setImages(newImages)
    }
    const onSubmit = (event) => {
        event.preventDefault();


        if (!TitleValue || !DescriptionValue || !numberInStocksValue ||
            !GenresValue || !RateValue || !TrailerLinkValue || !MovieLengthValue || !Images) {
            return alert('fill all the fields first!')
        }

        const variables = {
            title: TitleValue,
            description: DescriptionValue,
            numberInStocks: numberInStocksValue,
            images: Images,
            genre: GenresValue,
            rate: RateValue,
            trailerLink: TrailerLinkValue,
            movieLength: MovieLengthValue
        }

        Axios.post('/movies/uploadMovie', variables)
            .then(response => {
                if (response.data.success) {
                    alert('Product Successfully Uploaded')
                    props.history.push('/')
                } else {
                    alert('Failed to upload Product')
                }
            })

    }

    return (
        <div className="background-container pt-5">
        <div className="container">
          <h1 className="header">Add a new movie</h1>

            <form onSubmit={onSubmit} >

                {/* DropZone */}
                <FileUpload refreshFunction={updateImages} />

                <br />
                <br />
                <label>Title</label>
                <Input
                    onChange={onTitleChange}
                    value={TitleValue}
                />
                <br />
                <br />
                
                <label>NumbeInStocks</label>
                <Input
                    onChange={onNumberInStocksChange}
                    value={numberInStocksValue}
                    type="number"
                /> 
                <br /><br />
                <select onChange={onGenresSelectChange} value={GenresValue}>
                    {genres.map(item => (
                        <option key={item.key} value={item.key}>{item.value} </option>
                    ))}
                </select>
                <br />
                <br />
                <Input
                    onChange={onRateChange}
                    value={RateValue}
                />  
                <br />
                <br />
                <Input
                    onChange={onTrailerChange}
                    value={TrailerLinkValue}
                />  
                <br />
                <br />
                <Input
                    onChange={onMoviesLengthChange}
                    value={MovieLengthValue}
                />  
                <label>Description</label>
                <textarea
                    onChange={onDescriptionChange}
                    value={DescriptionValue}
                />
                <br />
                <br />
                
                <Button
                    onClick={onSubmit}
                >
                    Submit
                </Button>

            </form>
          </div>
        </div>
    )
}

export default UploadMoviePage
