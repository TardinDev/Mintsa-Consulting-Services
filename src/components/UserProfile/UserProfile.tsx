import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useAuthStore } from '../../stores/authStore';
import theme from '../../utils/Theme/theme';

const UserProfile: React.FC = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuthStore();

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <ProfileContainer>
      <ProfileCard>
        <ProfileHeader>
          <AvatarContainer>
            {user.imageUrl ? (
              <Avatar src={user.imageUrl} alt="Avatar" />
            ) : (
              <AvatarPlaceholder>
                {user.firstName?.[0] || user.email[0].toUpperCase()}
              </AvatarPlaceholder>
            )}
          </AvatarContainer>
          <UserInfo>
            <UserName>
              {user.firstName && user.lastName 
                ? `${user.firstName} ${user.lastName}` 
                : user.email
              }
            </UserName>
            <UserEmail>{user.email}</UserEmail>
            {isAdmin && (
              <AdminBadge>Administrateur</AdminBadge>
            )}
          </UserInfo>
        </ProfileHeader>

        <ProfileDetails>
          <DetailItem>
            <DetailLabel>ID Utilisateur:</DetailLabel>
            <DetailValue>{user.id}</DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>Membre depuis:</DetailLabel>
            <DetailValue>
              {user.createdAt.toLocaleDateString('fr-FR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </DetailValue>
          </DetailItem>
          <DetailItem>
            <DetailLabel>Statut:</DetailLabel>
            <DetailValue>
              {isAdmin ? 'Administrateur' : 'Utilisateur'}
            </DetailValue>
          </DetailItem>
        </ProfileDetails>

        <ProfileActions>
          <LogoutButton onClick={logout}>
            Se déconnecter
          </LogoutButton>
        </ProfileActions>
      </ProfileCard>
    </ProfileContainer>
  );
};

export default UserProfile;

const slideInUp = keyframes`
  from { opacity: 0; transform: translateY(28px); }
  to { opacity: 1; transform: translateY(0); }
`;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: ${theme.gradientConsulting};
  padding: 2rem;
`;

const ProfileCard = styled.div`
  background: ${theme.gray100};
  border: 1px solid ${theme.line};
  padding: 2.5rem;
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadowLg};
  width: 100%;
  max-width: 500px;
  position: relative;
  overflow: hidden;
  animation: ${slideInUp} 0.7s cubic-bezier(0.16, 1, 0.3, 1);

  &::before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    height: 2px;
    background: ${theme.gradientGold};
  }
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid ${theme.line};
`;

const AvatarContainer = styled.div`
  flex-shrink: 0;
`;

const Avatar = styled.img`
  width: 80px;
  height: 80px;
  border-radius: ${theme.borderRadius.full};
  object-fit: cover;
  border: 1px solid ${theme.copperLine};
`;

const AvatarPlaceholder = styled.div`
  width: 80px;
  height: 80px;
  border-radius: ${theme.borderRadius.full};
  background: ${theme.gradientGold};
  color: ${theme.black};
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${theme.fontDisplay};
  font-size: 2rem;
  font-weight: 600;
  box-shadow: ${theme.shadowCopper};
`;

const UserInfo = styled.div`
  flex: 1;
`;

const UserName = styled.h2`
  font-family: ${theme.fontDisplay};
  font-size: 1.5rem;
  font-weight: 600;
  color: ${theme.white};
  letter-spacing: -0.02em;
  margin: 0 0 0.5rem 0;
`;

const UserEmail = styled.p`
  font-family: ${theme.fontBody};
  color: ${theme.gray600};
  font-size: 0.95rem;
  margin: 0 0 0.6rem 0;
`;

const AdminBadge = styled.span`
  display: inline-block;
  background: rgba(199, 123, 59, 0.1);
  color: ${theme.primaryLight};
  border: 1px solid ${theme.copperLine};
  padding: 0.3rem 0.85rem;
  border-radius: ${theme.borderRadius.full};
  font-family: ${theme.fontBody};
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
`;

const ProfileDetails = styled.div`
  margin-bottom: 2rem;
`;

const DetailItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 1px solid ${theme.line};

  &:last-child {
    border-bottom: none;
  }
`;

const DetailLabel = styled.span`
  font-family: ${theme.fontBody};
  font-weight: 600;
  font-size: 0.85rem;
  color: ${theme.gray600};
`;

const DetailValue = styled.span`
  color: ${theme.gray800};
  font-family: ${theme.fontBody};
  font-size: 0.85rem;
  font-feature-settings: 'tnum';
  text-align: right;
  word-break: break-all;
`;

const ProfileActions = styled.div`
  display: flex;
  gap: 1rem;
`;

const LogoutButton = styled.button`
  background: transparent;
  color: ${theme.error};
  border: 1px solid rgba(208, 106, 91, 0.4);
  padding: 0.85rem 1.5rem;
  border-radius: ${theme.borderRadius.full};
  font-family: ${theme.fontBody};
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  width: 100%;

  &:hover {
    background: rgba(208, 106, 91, 0.1);
    border-color: ${theme.error};
    color: ${theme.white};
    transform: translateY(-2px);
  }
`;