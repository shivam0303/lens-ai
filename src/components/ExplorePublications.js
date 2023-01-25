import React, { useEffect, useState } from 'react'
import { explorePublications } from '../lensQueries/explorePublications'
import InfiniteScroll from "react-infinite-scroll-component";

export default function ExplorePublications(props) {

    var [users, setUsers] = useState([])
    const [criteria, setCriteria] = useState("LATEST")
    const [page, setPage] = useState("{\"timestamp\":1,\"offset\":0}")
    // const [imageOpacity, setImageOpacity] = useState(1)

    const init = async () => {
        try {
            const request = {
                sortCriteria: criteria, 
                noRandomize: true,
                sources: ["5bba5781-78b5-4927-8d2f-122742817583"],
                publicationTypes: ["POST"],
                cursor: page,
                limit: 24
            }
            const response = await explorePublications(request) 
            setPage(response.data.explorePublications.pageInfo.next)
            setUsers(response.data.explorePublications.items)
            console.log(response)
            console.log(users)

        } catch (err) {
            console.log(err)
        }
    }

    const fetchData = async () => {
        const request = {
            sortCriteria: criteria,
            noRandomize: true,
            sources: ["5bba5781-78b5-4927-8d2f-122742817583"],
            publicationTypes: ["POST"],
            cursor: page,
            limit: 24
        }
        const response = await explorePublications(request)
        setUsers([...users, ...response.data.explorePublications.items])
        setPage(response.data.explorePublications.pageInfo.next)
    };

    const onMouseImage = async (id) => {
        let btn = document.getElementById(id);
        btn.setAttribute( "class", "show" ); 
        
        
    }
    const outMouseImage = async (id) => {
        
        let btn = document.getElementById(id);
        btn.setAttribute( "class", "hide" );
        
    }


    const handleClick = async (e) => {
        setCriteria(e);
    }
    useEffect(() => {
        init();
    }, [criteria])

    return (

        <div className='body-container'>
            {/* {console.log(users)} */}
            <div className='body-header'>
                <div className='header-title'>
                    <div style={{width:"80%"}}>
                    <svg width="304" height="87" viewBox="0 0 304 87" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.34091 70V17.6364H12.6818V64.375H37.0227V70H6.34091ZM60.3286 70.8182C56.5445 70.8182 53.2803 69.983 50.536 68.3125C47.8088 66.625 45.7036 64.2727 44.2207 61.2557C42.7548 58.2216 42.0218 54.6932 42.0218 50.6705C42.0218 46.6477 42.7548 43.1023 44.2207 40.0341C45.7036 36.9489 47.7661 34.5455 50.4082 32.8239C53.0673 31.0852 56.1695 30.2159 59.715 30.2159C61.7605 30.2159 63.7803 30.5568 65.7747 31.2386C67.769 31.9205 69.5843 33.0284 71.2207 34.5625C72.857 36.0795 74.161 38.0909 75.1326 40.5966C76.1042 43.1023 76.59 46.1875 76.59 49.8523V52.4091H46.3173V47.1932H70.4536C70.4536 44.9773 70.0105 43 69.1241 41.2614C68.2548 39.5227 67.0105 38.1506 65.3911 37.1449C63.7889 36.1392 61.8968 35.6364 59.715 35.6364C57.3116 35.6364 55.232 36.233 53.4764 37.4261C51.7377 38.6023 50.3997 40.1364 49.4622 42.0284C48.5247 43.9205 48.0559 45.9489 48.0559 48.1136V51.5909C48.0559 54.5568 48.5673 57.071 49.59 59.1335C50.6298 61.179 52.0701 62.7386 53.911 63.8125C55.7519 64.8693 57.8911 65.3977 60.3286 65.3977C61.9139 65.3977 63.3457 65.1761 64.6241 64.733C65.9195 64.2727 67.036 63.5909 67.9735 62.6875C68.911 61.767 69.6355 60.625 70.1468 59.2614L75.9764 60.8977C75.3627 62.875 74.3315 64.6136 72.8826 66.1136C71.4338 67.5966 69.644 68.7557 67.5133 69.5909C65.3826 70.4091 62.9877 70.8182 60.3286 70.8182ZM89.6431 46.375V70H83.609V30.7273H89.4385V36.8636H89.9499C90.8703 34.8693 92.2681 33.267 94.1431 32.0568C96.0181 30.8295 98.4385 30.2159 101.404 30.2159C104.064 30.2159 106.39 30.7614 108.385 31.8523C110.379 32.9261 111.93 34.5625 113.038 36.7614C114.146 38.9432 114.7 41.7045 114.7 45.0455V70H108.666V45.4545C108.666 42.3693 107.865 39.9659 106.262 38.2443C104.66 36.5057 102.461 35.6364 99.6658 35.6364C97.7397 35.6364 96.0181 36.054 94.501 36.8892C93.001 37.7244 91.8164 38.9432 90.947 40.5455C90.0777 42.1477 89.6431 44.0909 89.6431 46.375ZM151.384 39.5227L145.964 41.0568C145.623 40.1534 145.12 39.2756 144.455 38.4233C143.808 37.554 142.921 36.8381 141.796 36.2756C140.671 35.7131 139.231 35.4318 137.475 35.4318C135.072 35.4318 133.069 35.9858 131.467 37.0938C129.882 38.1847 129.089 39.5739 129.089 41.2614C129.089 42.7614 129.634 43.946 130.725 44.8153C131.816 45.6847 133.521 46.4091 135.839 46.9886L141.668 48.4205C145.18 49.2727 147.796 50.5767 149.518 52.3324C151.239 54.071 152.1 56.3125 152.1 59.0568C152.1 61.3068 151.453 63.3182 150.157 65.0909C148.879 66.8636 147.089 68.2614 144.788 69.2841C142.487 70.3068 139.81 70.8182 136.759 70.8182C132.754 70.8182 129.438 69.9489 126.813 68.2102C124.188 66.4716 122.526 63.9318 121.828 60.5909L127.555 59.1591C128.1 61.2727 129.132 62.858 130.649 63.9148C132.183 64.9716 134.185 65.5 136.657 65.5C139.47 65.5 141.703 64.9034 143.356 63.7102C145.026 62.5 145.862 61.0511 145.862 59.3636C145.862 58 145.384 56.858 144.43 55.9375C143.475 55 142.009 54.3011 140.032 53.8409L133.487 52.3068C129.89 51.4545 127.248 50.1335 125.56 48.3438C123.89 46.5369 123.055 44.2784 123.055 41.5682C123.055 39.3523 123.677 37.392 124.921 35.6875C126.183 33.983 127.896 32.6449 130.06 31.6733C132.242 30.7017 134.714 30.2159 137.475 30.2159C141.362 30.2159 144.413 31.0682 146.629 32.7727C148.862 34.4773 150.447 36.7273 151.384 39.5227ZM180.079 70H173.432L192.659 17.6364H199.204L218.432 70H211.784L196.136 25.9205H195.727L180.079 70ZM182.534 49.5455H209.329V55.1705H182.534V49.5455ZM230.769 17.6364V70H224.428V17.6364H230.769Z" fill="white"></path><g clipPath="url(#clip0_52_220)"><rect x="250" y="17" width="13.2545" height="54" fill="#FE0000"></rect><rect x="263.255" y="17" width="13.7455" height="54" fill="#02FEFF"></rect><rect x="277" y="17" width="13.2545" height="54" fill="#D9D9D9"></rect><rect x="290.255" y="17" width="13.7455" height="54" fill="#FD01FD"></rect></g><defs><clipPath id="clip0_52_220"><rect width="54" height="54" fill="white" transform="translate(250 17)"></rect></clipPath></defs></svg>
                    </div>
                    <div style={{width:"10%",paddingTop:'50px'}}><a style={{textDecoration:"none",color:'green',height:'100%'}} href="https://docs.lens.xyz/docs/what-is-lens">
                    Lens 101</a></div>
                    <button style={{width:"20%",marginTop:'50px',marginLeft:"50px",background:"blue",color:'white'}}>Login / Signup</button>
                </div>
                <div className='header-description-container'>
                    <span className='opacity-low'>The LensAI frens has shared</span>
                    <span> beautiful artworks!</span>
                </div>
                <div className='sort-container'>
                    <div className='opacity-low' style={{ marginBottom: "2%" }}>
                        Sort by:
                    </div>
                    <div >
                        <button onClick={() => handleClick("LATEST")} type="button" 
                            className="sort-button btn btn-outline-secondary">Date created </button>
                        <button onClick={() => handleClick("TOP_COLLECTED")} type="button" 
                            className="sort-button btn btn-outline-secondary">Most collected</button>
                        <button onClick={() => handleClick("TOP_MIRRORED")} type="button" 
                            className="sort-button btn btn-outline-secondary">Most mirrored</button>
                    </div>
                </div>

            </div>

            <div>
                <InfiniteScroll
                    dataLength={users.length} 
                    next={fetchData}
                    hasMore={true}

                >
                <div className="card-deck ">
                    {
                        users.map((row, index) => {
                            return (
                                <div className="row " key={index}>
                                    {users.slice(index * 4, index * 4 + 4).map((item, i) => (
                                        <div onMouseEnter={() => onMouseImage(item.id)} onMouseLeave={() => outMouseImage(item.id)} className="col-lg-3 col-md-4" key={i} style={{ margin: "0", padding: "3px" }}>
                                            <div className="card border-dark" style={{ background: "black" }}>
                                                <img src={'https://lens.infura-ipfs.io/ipfs' + item.metadata.media[0].original.url.slice(6)} 
                                                    className="card-img-top" 
                                                    alt="Image"></img>
                                                <div id={item.id} className="hide" 
                                                style={{ background:'rgba(0,0,0,0.8)', position:'absolute', 
                                                width:'100%', height:'100%',padding:"50px 30px 40px 20px"}}
                                                >
                                                    <div style={{color:"green"}}>@{item.profile.handle}</div>
                                                    <div>Created at: {item.createdAt.slice(0,10)}</div>
                                                    <div>{item.stats.totalAmountOfMirrors}</div>
                                                    <div>{item.stats.totalAmountOfCollects}</div>
                                                    <div>{item.stats.totalAmountOfComments}</div>
                                                </div>
                                            </div>
                                            
                                        </div>
                                    ))}
                                </div>
                            );
                        })
                    }
                </div>
                </InfiniteScroll>
            </div>
        </div >
    )

}