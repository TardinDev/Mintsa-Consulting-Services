import React, { useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { FaWhatsapp, FaTimes, FaPaperPlane } from 'react-icons/fa';
import theme from '../../utils/Theme/theme';

const WhatsAppButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  // Numéro WhatsApp Business de MINTSA Services (à adapter)
  const WHATSAPP_NUMBER = '24174853484'; // Format international sans + ni espaces

  const predefinedMessages = [
    'Bonjour, je souhaite obtenir un devis pour...',
    'J\'ai une question concernant vos services',
    'Je voudrais prendre rendez-vous',
    'Pouvez-vous m\'aider avec une démarche administrative ?'
  ];

  const handleSendMessage = (customMessage?: string) => {
    const messageToSend = customMessage || message || 'Bonjour, j\'aimerais avoir des informations sur vos services.';
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(messageToSend)}`;
    window.open(whatsappUrl, '_blank');
    setIsOpen(false);
    setMessage('');
  };

  return (
    <>
      {/* Chat Popup */}
      {isOpen && (
        <ChatPopup>
          <ChatHeader>
            <HeaderContent>
              <WhatsAppIcon>
                <FaWhatsapp />
              </WhatsAppIcon>
              <HeaderText>
                <HeaderTitle>MINTSA Services</HeaderTitle>
                <HeaderStatus>
                  <StatusDot /> En ligne
                </HeaderStatus>
              </HeaderText>
            </HeaderContent>
            <CloseButton onClick={() => setIsOpen(false)} aria-label="Fermer">
              <FaTimes />
            </CloseButton>
          </ChatHeader>

          <ChatBody>
            <WelcomeMessage>
              <MessageBubble>
                <MessageText>
                  Bonjour ! Comment pouvons-nous vous aider aujourd'hui ?
                </MessageText>
                <MessageTime>Maintenant</MessageTime>
              </MessageBubble>
            </WelcomeMessage>

            <QuickReplies>
              <QuickRepliesTitle>Messages rapides :</QuickRepliesTitle>
              {predefinedMessages.map((msg, index) => (
                <QuickReplyButton
                  key={index}
                  onClick={() => handleSendMessage(msg)}
                >
                  {msg}
                </QuickReplyButton>
              ))}
            </QuickReplies>
          </ChatBody>

          <ChatFooter>
            <MessageInput
              type="text"
              placeholder="Tapez votre message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <SendButton onClick={() => handleSendMessage()} aria-label="Envoyer">
              <FaPaperPlane />
            </SendButton>
          </ChatFooter>
        </ChatPopup>
      )}

      {/* Floating Button */}
      <FloatingButton
        onClick={() => setIsOpen(!isOpen)}
        $isOpen={isOpen}
        aria-label="Ouvrir WhatsApp"
      >
        {isOpen ? <FaTimes /> : <FaWhatsapp />}
        {!isOpen && <NotificationBadge>1</NotificationBadge>}
      </FloatingButton>

      {/* Tooltip */}
      {!isOpen && (
        <Tooltip>
          Besoin d'aide ?
        </Tooltip>
      )}
    </>
  );
};

export default WhatsAppButton;

// Animations
const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(199, 123, 59, 0.55);
  }
  70% {
    box-shadow: 0 0 0 14px rgba(199, 123, 59, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(199, 123, 59, 0);
  }
`;

const statusPulse = keyframes`
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.4; transform: scale(0.8); }
`;

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.8);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
`;

// Styled Components
const FloatingButton = styled.button<{ $isOpen: boolean }>`
  position: fixed;
  bottom: ${({ $isOpen }) => ($isOpen ? '430px' : '8rem')};
  right: 2rem;
  width: 58px;
  height: 58px;
  border-radius: 50%;
  background: ${({ $isOpen }) => ($isOpen ? theme.gray100 : '#ffffff')};
  color: ${({ $isOpen }) => ($isOpen ? theme.gray700 : '#25D366')};
  border: 1px solid ${({ $isOpen }) => ($isOpen ? theme.lineStrong : 'transparent')};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  box-shadow: ${({ $isOpen }) => ($isOpen ? theme.shadowMd : theme.shadowCopper)};
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: ${theme.zFixed};
  ${({ $isOpen }) => !$isOpen && css`animation: ${pulse} 2.4s infinite;`}

  &:hover {
    transform: ${({ $isOpen }) => $isOpen ? 'rotate(90deg)' : 'translateY(-4px)'};
    color: ${({ $isOpen }) => ($isOpen ? theme.primaryLight : '#25D366')};
    border-color: ${({ $isOpen }) => ($isOpen ? theme.copperLine : 'transparent')};
    box-shadow: ${({ $isOpen }) => ($isOpen ? theme.shadowCopper : '0 16px 44px rgba(199, 123, 59, 0.42)')};
  }

  &:active {
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: 2px solid ${theme.primary};
    outline-offset: 3px;
  }

  @media (max-width: ${theme.breakpoints.md}) {
    bottom: ${({ $isOpen }) => ($isOpen ? '420px' : '7rem')};
    right: 1.5rem;
    width: 52px;
    height: 52px;
    font-size: 1.45rem;
  }
`;

const NotificationBadge = styled.div`
  position: absolute;
  top: -3px;
  right: -3px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: ${theme.black};
  color: ${theme.primaryLight};
  font-size: 0.7rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${theme.copperLine};
  animation: ${bounce} 1.4s ease infinite;
`;

const Tooltip = styled.div`
  position: fixed;
  bottom: 9.1rem;
  right: 6.5rem;
  background: ${theme.gray100};
  color: ${theme.gray800};
  padding: 0.55rem 0.9rem;
  border: 1px solid ${theme.lineStrong};
  border-radius: ${theme.borderRadius.md};
  font-family: ${theme.fontBody};
  font-size: 0.82rem;
  font-weight: 500;
  white-space: nowrap;
  box-shadow: ${theme.shadowMd};
  z-index: ${theme.zFixed};
  animation: ${slideUp} 0.3s ease;

  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    right: 18px;
    width: 10px;
    height: 10px;
    background: ${theme.gray100};
    border-right: 1px solid ${theme.lineStrong};
    border-bottom: 1px solid ${theme.lineStrong};
    transform: rotate(45deg);
  }

  @media (max-width: ${theme.breakpoints.md}) {
    display: none;
  }
`;

const ChatPopup = styled.div`
  position: fixed;
  bottom: 8rem;
  right: 2rem;
  width: 380px;
  max-height: 550px;
  background: ${theme.gray50};
  border: 1px solid ${theme.lineStrong};
  border-radius: ${theme.borderRadius.xl};
  box-shadow: ${theme.shadowXl};
  z-index: ${theme.zFixed};
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: ${slideUp} 0.4s cubic-bezier(0.16, 1, 0.3, 1);

  @media (max-width: ${theme.breakpoints.md}) {
    width: calc(100vw - 2rem);
    right: 1rem;
    bottom: 7rem;
    max-height: 500px;
  }
`;

const ChatHeader = styled.div`
  background: ${theme.gray100};
  padding: 1.1rem 1.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${theme.white};
  border-bottom: 1px solid ${theme.copperLine};
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const WhatsAppIcon = styled.div`
  width: 44px;
  height: 44px;
  border-radius: ${theme.borderRadius.md};
  background: ${theme.gray200};
  border: 1px solid ${theme.copperLine};
  color: #25D366;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.35rem;
`;

const HeaderText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
`;

const HeaderTitle = styled.div`
  font-family: ${theme.fontDisplay};
  font-size: 1.05rem;
  font-weight: 600;
  letter-spacing: -0.01em;
  color: ${theme.white};
`;

const HeaderStatus = styled.div`
  font-family: ${theme.fontBody};
  font-size: 0.78rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  color: ${theme.gray500};
`;

const StatusDot = styled.div`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: ${theme.success};
  box-shadow: 0 0 8px ${theme.success};
  animation: ${statusPulse} 2.4s ease-in-out infinite;
`;

const CloseButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: ${theme.borderRadius.md};
  background: ${theme.gray200};
  border: 1px solid ${theme.line};
  color: ${theme.gray600};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  transition: all ${theme.transition.fast};

  &:hover {
    color: ${theme.primaryLight};
    border-color: ${theme.copperLine};
    transform: rotate(90deg);
  }
`;

const ChatBody = styled.div`
  flex: 1;
  padding: 1.5rem;
  background: ${theme.cream};
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const WelcomeMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const MessageBubble = styled.div`
  background: ${theme.gray200};
  border: 1px solid ${theme.line};
  padding: 0.875rem 1rem;
  border-radius: 0 ${theme.borderRadius.lg} ${theme.borderRadius.lg} ${theme.borderRadius.lg};
  box-shadow: ${theme.shadowSm};
  max-width: 85%;
`;

const MessageText = styled.div`
  font-family: ${theme.fontBody};
  color: ${theme.gray800};
  font-size: 0.92rem;
  line-height: 1.5;
  margin-bottom: 0.375rem;
`;

const MessageTime = styled.div`
  color: ${theme.gray500};
  font-size: 0.68rem;
  text-align: right;
`;

const QuickReplies = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

const QuickRepliesTitle = styled.div`
  font-family: ${theme.fontBody};
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${theme.gray500};
  margin-bottom: 0.25rem;
`;

const QuickReplyButton = styled.button`
  padding: 0.75rem 1rem;
  background: ${theme.gray200};
  border: 1px solid ${theme.lineStrong};
  border-radius: ${theme.borderRadius.md};
  color: ${theme.gray700};
  font-family: ${theme.fontBody};
  font-size: 0.86rem;
  font-weight: 500;
  cursor: pointer;
  transition: all ${theme.transition.fast};
  text-align: left;
  line-height: 1.4;

  &:hover {
    background: rgba(199, 123, 59, 0.08);
    border-color: ${theme.copperLine};
    color: ${theme.white};
    transform: translateX(4px);
  }
`;

const ChatFooter = styled.div`
  padding: 1rem;
  background: ${theme.gray100};
  border-top: 1px solid ${theme.line};
  display: flex;
  gap: 0.75rem;
  align-items: center;
`;

const MessageInput = styled.input`
  flex: 1;
  padding: 0.75rem 1rem;
  background: ${theme.gray50};
  border: 1px solid ${theme.lineStrong};
  border-radius: ${theme.borderRadius.full};
  color: ${theme.gray900};
  font-family: ${theme.fontBody};
  font-size: 0.9rem;
  transition: all ${theme.transition.fast};

  &:focus {
    outline: none;
    border-color: ${theme.primary};
    box-shadow: 0 0 0 3px rgba(199, 123, 59, 0.15);
  }

  &::placeholder {
    color: ${theme.gray500};
  }
`;

const SendButton = styled.button`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: ${theme.gradientGold};
  color: ${theme.black};
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  flex-shrink: 0;
  box-shadow: ${theme.shadowCopper};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 28px rgba(199, 123, 59, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`;
