import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaWhatsapp, FaTimes } from 'react-icons/fa';
import theme from '../../utils/Theme/theme';

const WhatsAppButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  // Numéro WhatsApp Business de Mintsa Services (à adapter)
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
                <HeaderTitle>Mintsa Services</HeaderTitle>
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
                  👋 Bonjour ! Comment pouvons-nous vous aider aujourd'hui ?
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
              <FaWhatsapp />
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
          Besoin d'aide ? Discutons sur WhatsApp !
        </Tooltip>
      )}
    </>
  );
};

export default WhatsAppButton;

// Animations
const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.7);
  }
  70% {
    box-shadow: 0 0 0 15px rgba(37, 211, 102, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(37, 211, 102, 0);
  }
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
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: #25D366;
  color: ${theme.white};
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  box-shadow: 0 8px 24px rgba(37, 211, 102, 0.4);
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  z-index: ${theme.zFixed};
  animation: ${({ $isOpen }) => ($isOpen ? 'none' : `${pulse} 2s infinite`)};

  &:hover {
    transform: scale(1.1) rotate(${({ $isOpen }) => ($isOpen ? '90deg' : '0deg')});
    box-shadow: 0 12px 32px rgba(37, 211, 102, 0.5);
  }

  &:active {
    transform: scale(1.05);
  }

  @media (max-width: ${theme.breakpoints.md}) {
    bottom: ${({ $isOpen }) => ($isOpen ? '420px' : '7rem')};
    right: 1.5rem;
    width: 56px;
    height: 56px;
    font-size: 1.75rem;
  }
`;

const NotificationBadge = styled.div`
  position: absolute;
  top: -2px;
  right: -2px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: ${theme.error};
  color: ${theme.white};
  font-size: 0.75rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid ${theme.white};
  animation: ${bounce} 1s ease infinite;
`;

const Tooltip = styled.div`
  position: fixed;
  bottom: 9rem;
  right: 7rem;
  background: ${theme.gray900};
  color: ${theme.white};
  padding: 0.75rem 1rem;
  border-radius: ${theme.borderRadius.lg};
  font-size: 0.875rem;
  font-weight: 500;
  white-space: nowrap;
  box-shadow: ${theme.shadowLg};
  z-index: ${theme.zFixed};
  animation: ${slideUp} 0.3s ease;

  &::after {
    content: '';
    position: absolute;
    bottom: -6px;
    right: 20px;
    width: 12px;
    height: 12px;
    background: ${theme.gray900};
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
  background: ${theme.white};
  border-radius: ${theme.borderRadius.xl};
  box-shadow: 0 12px 48px rgba(0, 0, 0, 0.2);
  z-index: ${theme.zFixed};
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: ${slideUp} 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);

  @media (max-width: ${theme.breakpoints.md}) {
    width: calc(100vw - 2rem);
    right: 1rem;
    bottom: 7rem;
    max-height: 500px;
  }
`;

const ChatHeader = styled.div`
  background: #25D366;
  padding: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${theme.white};
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const WhatsAppIcon = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
`;

const HeaderText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const HeaderTitle = styled.div`
  font-size: 1rem;
  font-weight: 700;
`;

const HeaderStatus = styled.div`
  font-size: 0.8125rem;
  display: flex;
  align-items: center;
  gap: 0.375rem;
  opacity: 0.95;
`;

const StatusDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${theme.white};
  animation: ${pulse} 2s infinite;
`;

const CloseButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border: none;
  color: ${theme.white};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.125rem;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: rotate(90deg);
  }
`;

const ChatBody = styled.div`
  flex: 1;
  padding: 1.5rem;
  background: #E5DDD5;
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
  background: ${theme.white};
  padding: 0.875rem 1rem;
  border-radius: 0 ${theme.borderRadius.lg} ${theme.borderRadius.lg} ${theme.borderRadius.lg};
  box-shadow: ${theme.shadow};
  max-width: 80%;
`;

const MessageText = styled.div`
  color: ${theme.gray900};
  font-size: 0.9375rem;
  line-height: 1.5;
  margin-bottom: 0.375rem;
`;

const MessageTime = styled.div`
  color: ${theme.gray500};
  font-size: 0.6875rem;
  text-align: right;
`;

const QuickReplies = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
`;

const QuickRepliesTitle = styled.div`
  font-size: 0.8125rem;
  color: ${theme.gray600};
  font-weight: 600;
  margin-bottom: 0.25rem;
`;

const QuickReplyButton = styled.button`
  padding: 0.75rem 1rem;
  background: ${theme.white};
  border: 2px solid #25D366;
  border-radius: ${theme.borderRadius.lg};
  color: #25D366;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  text-align: left;
  line-height: 1.4;

  &:hover {
    background: #25D366;
    color: ${theme.white};
    transform: translateX(5px);
  }
`;

const ChatFooter = styled.div`
  padding: 1rem;
  background: ${theme.white};
  border-top: 1px solid ${theme.gray200};
  display: flex;
  gap: 0.75rem;
  align-items: center;
`;

const MessageInput = styled.input`
  flex: 1;
  padding: 0.75rem 1rem;
  border: 2px solid ${theme.gray300};
  border-radius: ${theme.borderRadius.full};
  font-size: 0.9375rem;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    border-color: #25D366;
    box-shadow: 0 0 0 3px rgba(37, 211, 102, 0.15);
  }

  &::placeholder {
    color: ${theme.gray400};
  }
`;

const SendButton = styled.button`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #25D366;
  color: ${theme.white};
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  flex-shrink: 0;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 4px 12px rgba(37, 211, 102, 0.4);
  }

  &:active {
    transform: scale(1.05);
  }
`;
