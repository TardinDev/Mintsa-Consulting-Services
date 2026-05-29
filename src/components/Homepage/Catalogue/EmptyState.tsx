import styled from "styled-components";
import Lottie from "react-lottie-player";
import lottieFille from "../../../../src/assets/images/sad.json";
import theme from "../../../utils/Theme/theme";
import ServiceText from "../Header/ServiceText";



interface EmptyStateProps {
    message: string;
    contactEmail: string;
    adress: string;
  }
  
  const EmptyState: React.FC<EmptyStateProps> = ({ message, contactEmail, adress}) => {

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
          <h6 style={{ fontSize: "1rem" }}>
            <span >{adress}</span> / {contactEmail}
          </h6>
        </div>
      </EmptyMessage>
    );
  };

  export default EmptyState;

  
  const EmptyMessage = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    text-align: center;
    margin: 3rem auto 1rem;
    max-width: 560px;
    padding: 3rem 2rem;
    background: ${theme.gray100};
    border: 1px solid ${theme.line};
    border-radius: ${theme.borderRadius.lg};
    color: ${theme.gray600};

    h3 {
      font-family: ${theme.fontDisplay};
      font-size: clamp(1.15rem, 2.4vw, 1.5rem);
      font-weight: 500;
      font-style: italic;
      line-height: 1.4;
      letter-spacing: -0.01em;
      color: ${theme.gray800};
      margin: 0;
    }

    h6 {
      font-family: ${theme.fontBody};
      color: ${theme.gray500};
      font-weight: 500;
      letter-spacing: 0.02em;
      margin: 0;

      span {
        color: ${theme.secondaryLight};
      }
    }

    .lottieAndText {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
    }

    .whatsappAndMail {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.6rem;
      padding-top: 1.5rem;
      width: 100%;
      border-top: 1px solid ${theme.line};
    }
  `;