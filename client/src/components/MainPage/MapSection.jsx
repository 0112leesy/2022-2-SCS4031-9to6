/*global kakao*/
import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { showSideBar } from '../../atoms';
import { useEffect, useState } from 'react';
// import markerImage from '../../imgs/markerSprite.png';
import style from './map.module.css';

const { kakao } = window;

const Container = styled.section`
    width: 100%;
    max-width: ${props => props.theme.maxWidth};
    min-height: ${props => props.theme.minHeight};
    padding-left: 460px;
    transition: all .5s;
    &.hide {
        padding-left: 0;
    }
`

const Map = styled.div`
    width: 100%;
    height: 100%;
`

function MapSection () {
    const visibility = useRecoilValue(showSideBar);

    var map;

    useEffect(()=>{
        var container = document.getElementById('map');
        var options = {
          center: new kakao.maps.LatLng(37.498004414546934, 127.02770621963765),
          level: 3
        };
        map = new kakao.maps.Map(container, options);
    }, []);

    const markerImage = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/category.png';

    const imageSize = { width: 22, height: 26 }
    const spriteSize = { width: 36, height: 98 }

    // 커피숍 마커가 표시될 좌표 배열입니다
  const coffeePositions = [
    { lat: 37.499590490909185, lng: 127.0263723554437 },
    { lat: 37.499427948430814, lng: 127.02794423197847 },
    { lat: 37.498553760499505, lng: 127.02882598822454 },
    { lat: 37.497625593121384, lng: 127.02935713582038 },
    { lat: 37.49646391248451, lng: 127.02675574250912 },
    { lat: 37.49629291770947, lng: 127.02587362608637 },
    { lat: 37.49754540521486, lng: 127.02546694890695 },
  ]
  const coffeeOrigin = { x: 10, y: 0 }

  // 편의점 마커가 표시될 좌표 배열입니다
  const storePositions = [
    { lat: 37.497535461505684, lng: 127.02948149502778 },
    { lat: 37.49671536281186, lng: 127.03020491448352 },
    { lat: 37.496201943633714, lng: 127.02959405469642 },
    { lat: 37.49640072567703, lng: 127.02726459882308 },
    { lat: 37.49640098874988, lng: 127.02609983175294 },
    { lat: 37.49932849491523, lng: 127.02935780247945 },
    { lat: 37.49996818951873, lng: 127.02943721562295 },
  ]
  const storeOrigin = { x: 10, y: 36 }

  // 주차장 마커가 표시될 좌표 배열입니다
  const carparkPositions = [
    { lat: 37.49966168796031, lng: 127.03007039430118 },
    { lat: 37.499463762912974, lng: 127.0288828824399 },
    { lat: 37.49896834100913, lng: 127.02833986892401 },
    { lat: 37.49893267508434, lng: 127.02673400572665 },
    { lat: 37.49872543597439, lng: 127.02676785815386 },
    { lat: 37.49813096097184, lng: 127.02591949495914 },
    { lat: 37.497680616783086, lng: 127.02518427952202 },
  ]
  const carparkOrigin = { x: 10, y: 72 }

    const [selectedCategory, setSelectedCategory] = useState("coffee")

  useEffect(() => {
    const coffeeMenu = document.getElementById("coffeeMenu")
    const storeMenu = document.getElementById("storeMenu")
    const carparkMenu = document.getElementById("carparkMenu")

    if (selectedCategory === "coffee") {
      // 커피숍 카테고리를 선택된 스타일로 변경하고
      coffeeMenu.className = `${style.menu_selected}`

      // 편의점과 주차장 카테고리는 선택되지 않은 스타일로 바꿉니다
      storeMenu.className = ""
      carparkMenu.className = ""
    } else if (selectedCategory === "store") {
      // 편의점 카테고리가 클릭됐을 때

      // 편의점 카테고리를 선택된 스타일로 변경하고
      coffeeMenu.className = ""
      storeMenu.className = `${style.menu_selected}`
      carparkMenu.className = ""
    } else if (selectedCategory === "carpark") {
      // 주차장 카테고리가 클릭됐을 때

      // 주차장 카테고리를 선택된 스타일로 변경하고
      coffeeMenu.className = ""
      storeMenu.className = ""
      carparkMenu.className = `${style.menu_selected}`
    }
  }, [selectedCategory])

    return(
    <Container id={style.mapwrap} className={visibility ? '' : 'hide'}>
        <Map id='map'>
        {selectedCategory === "coffee" &&
            coffeePositions.map((position) => (
              <div
                key={`coffee-${position.lat},${position.lng}`}
                position={position}
                image={{
                  src: markerImage,
                  size: imageSize,
                  options: {
                    spriteSize: spriteSize,
                    spriteOrigin: coffeeOrigin,
                  },
                }}
              />
            ))}
          {selectedCategory === "store" &&
            storePositions.map((position) => (
              <div
                key={`store-${position.lat},${position.lng}`}
                position={position}
                image={{
                  src: markerImage,
                  size: imageSize,
                  options: {
                    spriteSize: spriteSize,
                    spriteOrigin: storeOrigin,
                  },
                }}
              />
            ))}
          {selectedCategory === "carpark" &&
            carparkPositions.map((position) => (
              <div
                key={`carpark-${position.lat},${position.lng}`}
                position={position}
                image={{
                  src: markerImage,
                  size: imageSize,
                  options: {
                    spriteSize: spriteSize,
                    spriteOrigin: carparkOrigin,
                  },
                }}
              />
            ))}
        </Map>
        <div className={`${style.category}`}>
          <ul>
            <li id="coffeeMenu" onClick={() => setSelectedCategory("coffee")}>
              <span className={`${style.ico_comm} ${style.ico_coffee}`}></span>
              커피숍
            </li>
            <li id="storeMenu" onClick={() => setSelectedCategory("store")}>
              <span className={`${style.ico_comm} ${style.ico_store}`}></span>
              편의점
            </li>
            <li id="carparkMenu" onClick={() => setSelectedCategory("carpark")}>
              <span className={`${style.ico_comm} ${style.ico_carpark}`}></span>
              주차장
            </li>
          </ul>
        </div>
    </Container>)
}
export default MapSection;