export interface AdminCredentials {
    email: string;
    password: string;
  }
  
  // Faux identifiants d'admin (pour le test)
  export const fakeAdminCredentials: AdminCredentials = {
    email: 'admin@gmail.com',
    password: 'admin123',
  };
  
  /**
   * Vérifie si les identifiants fournis sont corrects.
   * @param email - L'email saisi par l'utilisateur
   * @param password - Le mot de passe saisi par l'utilisateur
   * @returns `true` si les identifiants sont corrects, sinon `false`.
   */
  export const login = (email: string, password: string): boolean => {
    return email === fakeAdminCredentials.email && password === fakeAdminCredentials.password;
  };
  
  /**
   * Déconnecte l'utilisateur.
   * Cette fonction peut être étendue pour inclure des mécanismes de suppression de tokens ou de sessions.
   */
  export const logout = (): void => {
    console.log('Utilisateur déconnecté');
  };
  