export interface BannerData {
  buttons: any;
  id: number;
  title: string;
  description: string;
  image: any;
}
export interface cardImageType {
    title:string,
    description:string,
    imgUrl:string
  }
  export interface FAQtype{
    question:string
    answer:string
  }
  export interface listRoadmap {
    title:string,
    list:string[],
    description:string,
    imgUrl:string
  }
  export interface ImageAltType{
    imgUrl:string,
    title:string,
  }
  export  interface TitleDescriptionType{
        title:string
        description:string
      }
     export interface Section {
        id: string;
        title: string;
        content: string;
      }
      export interface ContentButton {
        id: string;          // Unique identifier for each button
        title: string;       // Button display text
        link: string;        // URL the button links to
      }
      
      // Define the type for the image object
      export interface ContentImageData {
        url: string;
      }
      
      // Define the type for the main section content
      export interface ColImageSectionData {
        border_buttons: ContentButton[]
        primary_buttons: ContentButton[]
        image: ContentImageData;
        heading: string;
        description: string;
        borderButtons: ContentButton[];    // API-provided border buttons
  primaryButtons: ContentButton[];
      }
      
      // Define props for LeftColImage based on your component's structure
      export interface ColImageProps {
        title: string;
        imgUrl: string;
        description: string;
        borderButtons: ContentButton[];    // Array of Button objects for border buttons
        primaryButtons: ContentButton[];   // Array of Button objects for primary buttons
      }