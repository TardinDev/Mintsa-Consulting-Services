import styled from "styled-components";
import Lottie from "react-lottie-player";
import lottieFille from "../../../../src/assets/images/sad.json";
import theme from "../../../utils/Theme/theme";
import ServiceText from "../Header/ServiceText";



interface EmptyStateProps {
    message: string;
    contactEmail: string;
  }
  
  const EmptyState: React.FC<EmptyStateProps> = ({ message, contactEmail }) => {

    return (
      <EmptyMessage>
        <div className="lottieAndText">
          <Lottie
            animationData={lottieFille}
            play
            loop
            style={{ width: "100%", maxWidth: "200px", height: "auto" }}
          />
          <h3>{message}</h3>
        </div>
        <div className="whatsappAndMail">
          <ServiceText />
          <h6>{contactEmail}</h6>
        </div>
      </EmptyMessage>
    );
  };

  export default EmptyState;

  
  const EmptyMessage = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    text-align: center;
    margin-top: 50px;
    font-size: 3em;
    color: #555;
  
    h3 {
      color: ${theme.primary};
    }
  
    .lottieAndText {
      display: flex;
      align-items: center;
      gap: 10px;
    }
  
    .whatsappAndMail {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.1rem;
    }
  `;