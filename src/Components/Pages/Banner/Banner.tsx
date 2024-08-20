import "./Banner.css";
import banner from "../../../Assets/Images/banner.jpg";

export function Banner(): JSX.Element {
    return (
        <div className="Banner">
		    <img src={banner} width="100%" height="400px" />
        </div>
    );
}
