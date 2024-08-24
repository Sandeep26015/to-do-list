import React, { useState, useEffect } from 'react'
import './App.css'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import InputColor from 'react-input-color'
// import backgroundImage from './path-to-your-image.jpg';

const App = () => {
  const [data, setData] = useState({ title: "", note: "" });
  const [mode, setMode] = useState("ADD Task");
  const [getLocalData, setGetLocalData] = useState([]);
  const [index, setIndex] = useState();
  const [boxes, setBoxes] = useState(false);
  const [color, setColor] = useState({});
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  const backgroundImageChange = (e) => {
    const file = e.target.files[0];


  };

  const colorHandle = (e, index) => {
    let localData = [...getLocalData];
    localData[index] = { ...localData[index], color: e.rgba };
    setColor(e.rgba);
    localStorage.setItem("tododata", JSON.stringify(localData));
    setGetLocalData(localData);
    console.log("colure", e.rgba);

  };

  // const appStyle = {
  //   backgroundImage: `url(${backgroundImage})`,
  //   backgroundSize: 'cover',
  //   backgroundRepeat: 'no-repeat',
  //   minHeight: '100vh',
  //   display: 'flex',
  //   flexDirection: 'column',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   color: 'white',
  // };
  




  useEffect(() => {
    let getData = JSON.parse(localStorage.getItem("userData")) || [];
    setGetLocalData(getData);
  }, [boxes]);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);



  const changeHandle = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }
  const ClickHandle = (e) => {
    e.preventDefault();
    if (mode === "ADD Task") {
      add();
    } else {
      update();
    }
  };
  const add = () => {
    const obj = {
      id: Date.now(),
      timestamp: new Date().toLocaleTimeString()
    }
    let localData = [...getLocalData, data];
    localStorage.setItem("userData", JSON.stringify(localData));
    setGetLocalData(localData);
    setBoxes(true);
    setData({ title: "", note: "" }, obj);


  }
  const update = () => {
    let localData = [...getLocalData];
    localData[index] = data;
    localStorage.setItem("userData", JSON.stringify(localData));
    setGetLocalData(localData);
    setMode("ADD Task");
    setData({ title: "", note: "" });
  };
  const deleteHandle = (i) => {
    let localData = [...getLocalData];
    localData.splice(i, 1);
    localStorage.setItem("userData", JSON.stringify(localData));
    setGetLocalData(localData);
  };
  const EditHandle = (e, i) => {
    setMode("update");
    setIndex(i);
    setData({ title: e.title, note: e.note });
  };



  return (
    <div className='bg-black main-box'>
      <nav className='bg-lime-500 py-3'>
        <ul className='list-none flex mx-5 cursor-pointer gap-10'>
          <li>
            Home
          </li>
          <li>
            To-Do List
          </li>
        </ul>
      </nav>
      <p className="text-md mt-5 text-white">Current Date & Time: {currentDateTime.toLocaleString()}</p>
      <h1 className="text-3xl text-green-500 font-bold text-center ">
        To Do List
      </h1>

      <div className='flex flex-col gap-3 align-middle justify-center items-center flex-wrap'>
        <textarea onChange={changeHandle} value={data.title} name="title"
          placeholder="title"
          type="text"

          className="text-white block bg-blue-500 bg-opacity-50 m-0 border-slate-500 rounded-md py-3 pl-9 pr-3 mt-5 shadow-sm focus:outline-none w-2/4 text-sm"
        />
        <textarea onChange={changeHandle} value={data.note} name="note"
          placeholder="note"
          type="text"

          className="text-white block bg-blue-500 bg-opacity-50 m-0 border-slate-500 rounded-md py-3  pl-9 pr-3 mt-5 shadow-sm focus:outline-none w-2/4 text-sm"
        />
        <button onClick={ClickHandle} className='text-rose-600  px-10 bg-gray-800 rounded-lg py-4 mt-8 inline-flex items-center justify-center overflow-hidden'>{mode}</button>
      </div>

      <div className="flex flex-row flex-wrap justify-center mt-8">
        {getLocalData?.map((e, i) => (
          <div className="">
            <div key={i} className="box-main "
              style={{
                backgroundColor: color.rgba,
                // appStyle


              }}
            >
              <div >

                <p className="btn btn-danger me-3 mb-2 cursor-pointer inline-block">
                  <DeleteIcon
                    size={22}
                    style={{ fill: "black" }}
                    onClick={() => {
                      deleteHandle(i);
                    }}
                  />

                </p>
                <p className="btn btn-danger mb-2  cursor-pointer inline-block">
                  <EditIcon
                    size={22}
                    style={{ fill: "black" }}
                    onClick={() => {
                      EditHandle(e, i);
                    }}
                  />
                </p>
                <div>
                  < InputColor
                    type="color"
                    onChange={(e) => colorHandle(e, i)}
                    initialValue="##00800097"
                    placement="right"
                  />
                  <input type="file" accept="image/*" onChange={backgroundImageChange} />
                </div>
                <h2 className="text-4xl mt-2 text-white">{e.title}</h2>
                <p className="text-md mt-5 text-white">{e.note}</p>
                {data.text} (Added at: {data.timestamp})
              </div>
            </div>
          </div>
        ))}
      </div>



    </div>

  )
}

export default App