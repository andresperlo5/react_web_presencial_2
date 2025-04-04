import Carousel from 'react-bootstrap/Carousel';
import "./CarouselC.css"

const CarouselC = () => {
  return (
    <>
      <Carousel fade>
        <Carousel.Item>
          <img src="https://c4.wallpaperflare.com/wallpaper/632/162/458/lago-naturaleza-4k-8k-wallpaper-preview.jpg" alt="" className='w-100' />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img src="https://wallpapers.com/images/hd/1920x1080-hd-nature-old-mountain-o3g4tz5qe34ij38f.jpg" alt="" className='w-100' />
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img src="https://wallpapers.com/images/hd/1920x1080-hd-nature-old-mountain-o3g4tz5qe34ij38f.jpg" alt="" className='w-100' />
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

    </>
  )
}

export default CarouselC