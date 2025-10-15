export function getToken(token: string): string {
  
  if (token.startsWith('Bearer ')) {
    return token.split(' ')[1]; 
  }

  return token; 
}
