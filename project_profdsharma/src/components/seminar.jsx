import { useEffect, useState } from "react";
import { getDownloadURL, ref, listAll } from "firebase/storage";
import storage from "../firebase/storage";
import Topheader from "./Topheader";
import Player from "../hooks/Player";

export default function Seminar() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const listRef = ref(storage, "seminar");
      try {
        const res = await listAll(listRef);
        const urls = await Promise.all(
          res.items.map((itemRef) => getDownloadURL(itemRef))
        );
        setData(urls);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <section>
      <Topheader
        title="Glimpse of Our Seminar"
        subtitle="Glimpse of Our Seminar"
        address=""
      />
      <main>
        <section>
          {data && (
            <div className="py-4 container-fluid">
              <div className="container">
                <div className="video-row row  justify-content-center">
                  {data.map((item, index) => (
                    <div
                      className="col-md-4 col-sm-6 p-2"
                      key={`${item}_${index}`}
                    >
                      <video width="100%" height="auto" controls>
                        <source src={item} type="video/mp4" />
                      </video>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </section>
      </main>
    </section>
  );
}
