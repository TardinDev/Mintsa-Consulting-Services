import React from 'react';
import styled from 'styled-components';
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
              <AdminBadge>👑 Administrateur</AdminBadge>
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
            🚪 Se déconnecter
          </LogoutButton>
        </ProfileActions>
      </ProfileCard>
    </ProfileContainer>
  );
};

export default UserProfile;

const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: ${theme.gradientPrimary};
  padding: 2rem;
`;

const ProfileCard = styled.div`
  background: ${theme.white};
  padding: 2rem;
  border-radius: ${theme.borderRadius.xl};
  box-shadow: ${theme.shadow2xl};
  width: 100%;
  max-width: 500px;
  animation: slideInUp 0.6s ease-out;

  @keyframes slideInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid ${theme.gray200};
`;

const AvatarContainer = styled.div`
  flex-shrink: 0;
`;

const Avatar = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid ${theme.primary};
`;

const AvatarPlaceholder = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: ${theme.gradientPrimary};
  color: ${theme.white};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: 700;
  border: 3px solid ${theme.primary};
`;

const UserInfo = styled.div`
  flex: 1;
`;

const UserName = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${theme.gray900};
  margin: 0 0 0.5rem 0;
`;

const UserEmail = styled.p`
  color: ${theme.gray600};
  font-size: 1rem;
  margin: 0 0 0.5rem 0;
`;

const AdminBadge = styled.span`
  display: inline-block;
  background: ${theme.gradientPrimary};
  color: ${theme.white};
  padding: 0.25rem 0.75rem;
  border-radius: ${theme.borderRadius.full};
  font-size: 0.875rem;
  font-weight: 600;
`;

const ProfileDetails = styled.div`
  margin-bottom: 2rem;
`;

const DetailItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid ${theme.gray100};

  &:last-child {
    border-bottom: none;
  }
`;

const DetailLabel = styled.span`
  font-weight: 600;
  color: ${theme.gray700};
`;

const DetailValue = styled.span`
  color: ${theme.gray900};
  font-family: 'Courier New', monospace;
  font-size: 0.875rem;
`;

const ProfileActions = styled.div`
  display: flex;
  gap: 1rem;
`;

const LogoutButton = styled.button`
  background: ${theme.error};
  color: ${theme.white};
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: ${theme.borderRadius.lg};
  font-weight: 600;
  cursor: pointer;
  transition: all ${theme.transition.normal};
  width: 100%;

  &:hover {
    background: #dc2626;
    transform: translateY(-2px);
  }
`; 