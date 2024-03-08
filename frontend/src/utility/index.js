export const authorization =
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMjk4ZjU5NTJkOTVkNWY0NjIwODEyNTI5OTVhOGU4OSIsInN1YiI6IjY0OWEzNjM4ZDM1ZGVhMDEyYzE2YTQxYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.VWiYH-cTeC1Iq7A-iEzg0p29ZacQqx2Bk2zlzoa0whs";

export const userprofile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if(!user) {
    localStorage.setItem("user", JSON.stringify({}));
    return {}
  }else{
    return user
  }
}


export const localBackendUrl = "http://127.0.0.1:3000/api";



export const scrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };




  export function formatDateAndTime(inputDateTimeStr,page='chat') {
    // Convert input string to Date object
    const inputDateTime = new Date(inputDateTimeStr);
  
    // Get current date and time
    const currentDateTime = new Date();
  
    // Calculate the difference between current and input datetime in seconds
    const timeDifference = Math.floor((currentDateTime - inputDateTime) / 1000);
  
    // Check conditions and format accordingly
    const hours = inputDateTime.getHours();
    const minutes = inputDateTime.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedTime = `${(hours % 12) || 12}:${minutes}${ampm}`;

    if (timeDifference === 0) {
      if (page === 'chatNav'){
        return 'now'
      }

      return formattedTime
    }
    else if (timeDifference < 60) {
      if (page === 'chatNav'){
        return `${timeDifference} sec${timeDifference === 1 ? '' :'s'} ago`;
      }

      return formattedTime;
    }
      else if (timeDifference < 60 * 60) {
      // If it's within the same day but more than a minute ago
      return formattedTime
    } else if (
      currentDateTime.toDateString() === inputDateTime.toDateString()
    ) {
      // If it's today
      if (page === 'chatNav' || page=== 'chat'){
        return formattedTime
      }
      return `Today ${formattedTime}`;
    } 
    else if (
      inputDateTime.getDate() === currentDateTime.getDate() - 1 &&
      inputDateTime.getMonth() === currentDateTime.getMonth() &&
      inputDateTime.getFullYear() === currentDateTime.getFullYear()
    ) {
      // If it's yesterday
      const hours = inputDateTime.getHours();
      const minutes = inputDateTime.getMinutes();
      const ampm = hours >= 12 ? "PM" : "AM";
      const formattedTime = `${(hours % 12) || 12}:${minutes}${ampm}`;
      return `Yesterday ${formattedTime}`;
    } 
    else {
      // If it's more than yesterday
      if (page === 'chatNav'){
        const formattedDate = inputDateTime.toLocaleString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });
        return formattedDate;
      }
      
      const formattedDate = inputDateTime.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
      return formattedDate;
    }
  }
  
  
  
  

  
