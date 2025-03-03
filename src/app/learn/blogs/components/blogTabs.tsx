import { Button } from "react-bootstrap";

const BlogTabs=({tabs}:any)=>{
    return(
        <>
        <div className="flex">
            <Button  className="blog-tabs">All</Button>
            <>{tabs?.data?.map((item:any,index:number)=>{
            return(
                <Button className="blog-tabs" key={item.id+index}>{item.tab}</Button>
            )
        })}
            </>
        </div>
        </>
    )
}
export default BlogTabs;