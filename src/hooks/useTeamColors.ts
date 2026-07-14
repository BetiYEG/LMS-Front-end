// src/hooks/useTeamColors.ts
import { useEffect } from 'react'
import { applyTeamColors, getTeamColors } from '@/utils/colors'
import { getTeamKey } from '@/utils/config'

export const useTeamColors = () => {
  useEffect(() => {
    const teamKey = getTeamKey()
    applyTeamColors(teamKey)
  }, [])
  
  const teamKey = getTeamKey()
  const colors = getTeamColors(teamKey)
  
  return {
    teamKey,
    colors,
    applyTeamColors,
  }
}

export default useTeamColors