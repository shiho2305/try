import React, { useEffect, useRef, useState } from "react";
import "./style.css";

const Photos = () => {

    const [photos, setPhotos] = useState([]);
    const [filteredPhotos, setFilteredPhotos] = useState([]);
    const [visiblePhotos, setVisiblePhotos] = useState(12);
    const [albumIdSearch, setAlbumIdSearch] = useState("");
    const searchInputRef = useRef(null);

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/photos")
          .then((response) => response.json())
          .then((data) => {
            setPhotos(data);
            setFilteredPhotos(data); 
          });
      }, []);

    const loadMorePhotos = () => {
        setVisiblePhotos((pre) => pre + 12);
    }

    const handleSearch = () => {
        // Filter photos based on the albumIdSearch query from the original photos
        const filterPhotos = photos.filter(
          (photo) => photo.albumId.toString() === albumIdSearch
        );
        setFilteredPhotos(filterPhotos); // Update filtered photos
        setVisiblePhotos(12); // Reset visiblePhotos to show the filtered photos
    };

    const handleSearchOnEnter = (e) => {
      if(e.key === "Enter"){
        handleSearch();
      }
    }

    const handleSearchButtonClick = ()=> {
      handleSearch();
      searchInputRef.current.focus();
    }

    if(!photos){
        return <h1 className="text-center">Loading...</h1>
    }


  return (
    <div className="container mt-2">
      <h2 className="fw-bolder mb-4">Photos</h2>

      <div className="row mb-4">
        <div className="col-5 col-md-5 col-sm-10 d-flex align-items-center gap-2 formFilter">
          <div>
            <select name="filter" className="form-select" onChange={(e) => setAlbumIdSearch(e.target.value)}>
              <option value="albumId">Album id</option>
            </select>
          </div>
          <div>
            <input type="search" placeholder="Search by album id" className="form-control" value={albumIdSearch}
              onChange={(e) => setAlbumIdSearch(e.target.value)} onKeyDown={handleSearchOnEnter} ref={searchInputRef}/>
          </div>
          <div>
            <button type="submit" className="btn btn-primary" onClick={handleSearchButtonClick}>Search</button>
          </div>
        </div>
      </div>

      <div className="row">

        {filteredPhotos.slice(0, visiblePhotos).map((photo) => {
            return (
                <div className="mb-4 col-3" key={photo.id}>
                    <div className="w-100 card">
                        <img className="card-img-top" src={photo.url} alt="image error" />
                        <div className="card-body">
                            <div className="w-full text-text-truncate card-title h5">
                                {photo.title}
                            </div>
                            <p className="mb-1 card-text">
                                Id: #{photo.id}
                            </p>
                            <p className="card-text">
                                Album Id: {photo.albumId}
                            </p>
                        </div>
                    </div>
                </div>
            );
        })}

      </div>

      <div className="loadMore text-center w-100 mt-1 mb-3">
        <button className="btn btn-primary" onClick={loadMorePhotos}>Load more</button>
      </div>

    </div>
  );
};

export default Photos;
