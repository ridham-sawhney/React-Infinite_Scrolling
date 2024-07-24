import { useEffect, useRef, useState } from "react";


export default function useVisible(callback){
    const elementRef = useRef();
    const observerRef = useRef(null);
    // const [isVisible,setIsVisible] = useState(false);
    useEffect(() => {
        observerRef.current= new IntersectionObserver(([entry]) => {
          if (entry.isIntersecting) {
            // if(isVisible==false)
            // setIsVisible((prev)=>!prev);
            console.log(entry.target.innerText+ 'seen !')
            callback();
          } 
        //   else {
        //     if(isVisible==true)
        //         setIsVisible((prev)=>!prev);
        //   }
        });
      
        if (elementRef.current) {
            observerRef.current.observe(elementRef.current);
        }

       
      
        return () => {
          if (elementRef.current) {
            observerRef.current.disconnect();
            // observerRef.current.unobserve(elementRef.current);
          }
        };
      }, [callback]);

      return [elementRef];
}

// import { useEffect, useRef } from "react";

// export default function useVisible(callback) {
//   const elementRef = useRef();
//   const observerRef = useRef(null);

//   useEffect(() => {
//     const observer = new IntersectionObserver(([entry]) => {
//       if (entry.isIntersecting) {
//         callback();
//       }
//     });

//     observerRef.current = observer;

//     return () => {
//       if (observerRef.current && elementRef.current) {
//         observerRef.current.unobserve(elementRef.current);
//       }
//     };
//   }, [callback]);

//   useEffect(() => {
//     if (elementRef.current) {
//       observerRef.current.observe(elementRef.current);
//     }

//     return () => {
//       if (observerRef.current && elementRef.current) {
//         observerRef.current.unobserve(elementRef.current);
//       }
//     };
//   }, [elementRef.current]);

//   return [elementRef];
// }
