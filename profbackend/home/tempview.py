
def fetch_channel_details(request):
    # Authenticate and authorize the API request
    api_key = get_api_key()
    youtube = build('youtube', 'v3', developerKey=api_key)
    playlists = []
    videos = []
    comments = []
    statistics = []
    video_ids = []

    # Fetch the playlists for the channel
    playlists_request = youtube.playlists().list(
        part='snippet',
        channelId=CHANNEL_ID,
        maxResults=50
    )
    while playlists_request:
        playlists_response = playlists_request.execute()
        playlists.extend(playlists_response.get("items", []))
        playlists_request = youtube.playlists().list_next(playlists_request, playlists_response)

    for playlist in playlists:
        playlist_id = playlist['id']
        # Fetch the videos in the playlist
        videos_request = youtube.playlistItems().list(
            part='snippet',
            maxResults=10,
            playlistId=playlist_id
        )
        while videos_request:
            videos_response = videos_request.execute()
            videos.extend(videos_response.get("items", []))
            video_ids.extend([video['snippet']['resourceId']['videoId'] for video in videos_response.get("items", [])])
            videos_request = youtube.playlistItems().list_next(videos_request, videos_response)

    # Fetch comments for the videos
        for video in videos:
            video_id = video['snippet']['resourceId']['videoId']
            comments_request = youtube.comments().list(
                part='snippet',
                maxResults=10,
                parentId=video_id
            )
            comments_response = comments_request.execute()
            comments.extend(comments_response['items'])
            comments_request = youtube.comments().list_next(comments_request, comments_response)

    # Fetch the statistics of the videos
    video_ids = [video['snippet']['resourceId']['videoId'] for video in videos]
    video_ids_string = '&'.join(video_ids)
    statistics_request = youtube.videos().list(
        part='statistics',
        id=video_ids_string
    )
    statistics_response = statistics_request.execute()
    statistics.extend(statistics_response['items'])


    data = {
        'playlists': playlists,
        'videos': videos,
        'comments': comments,
        'statistics': statistics
    }
    return JsonResponse(data)





            <div className="nav-wrapper">
              <div className="logo-container">
                {headerData &&
                  headerData.map((data) => (
                    <img className="logo" src={data.logo} alt="" />
                  ))}
              </div>
              <nav className="d-flex align-item-center">
                <input className="hidden" type="checkbox" id="menuToggle" />
                <label className="menu-btn" htmlFor="menuToggle">
                  {/* <div className="menu">
                  <GiHamburgerMenu />

                  </div> */}
                  <div className="menu"></div>
                  <div className="menu"></div>
                  <div className="menu"></div>
                </label>
                <div className="nav-container">
                  <ul className="nav-tabs">
                    <li className="nav-item active">
                      <Link className="nav-tab" to="/">
                        Home
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-tab" to="/about_us">
                        About Us
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-tab" to="/stotra-and-stuti">
                        Stotra And Stuti
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-tab" to="/seminar">
                        Glimpse of Our Seminar
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-tab" to="/public-opinion">
                        Public Opinion
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-tab" to="/Contact">
                        Contact US
                      </Link>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>


















                  {youtubedata.playlistsitems.map((item, index) => (
        <div
          className={`py-4 container-fluid ${
            index % 2 === 0 ? "bg-light" : "bg-white"
          }`}
          key={index}
        >
          <div className="container">
            <div className="row no-margin video-title">
              <h6 className="d-flex align-item-center justify-content-center">
                <span className="mr-2">
                  <FaBook />{" "}
                </span>
                {item.title}
              </h6>
            </div>
            <div className="video-row row">
              {item.items.map((data, index) => (
                <div
                  className="col-lg-3 col-md-4 col-sm-6 mycard p-2"
                  key={index}
                >
                  <Link
                    to={`/about/${data.snippet.resourceId.videoId}/${item.playlistsId}`}
                    key={index}
                  >
                    <div className="video-card">
                      <img
                        src={data.snippet.thumbnails.medium.url}
                        alt="thumbnail"
                      />
                      <div className="row details no-margin">
                        <h6>{data.snippet.title}</h6>
                        <div className="col-md-6 col-6 no-padding left">
                          <div className="">
                            <span className="mr-2 my-auto">
                              {" "}
                              <FaEye />
                            </span>
                            <span>
                              {data.statistics && data.statistics.viewCount}
                            </span>
                          </div>
                        </div>
                        <div className="col-md-6 col-6 no-padding right">
                          <div className="">
                            <span className="mr-2 my-auto">
                              <FaComments />
                            </span>
                            <span>
                              {data.statistics && data.statistics.commentCount}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}