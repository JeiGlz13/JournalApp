import React from 'react'

export const JournalDate = ({date}) => {
  return (
    <div className="date-container">
        <div className="date-month">
            {
                date.format('MMMM')
            }
        </div>

        <span className="date-day">
            {
                date.format('D')
            }
        </span>
        
        <div className="pb-2 px-2 border-l border-r border-b rounded-b flex justify-between date-year">
            <span className="text-xs font-bold">
                {
                    date.format('ddd')
                }
            </span>
            <span className="text-xs font-bold">
                {
                    date.format('YYYY')
                }
            </span>
        </div>
    </div>
  )
}
