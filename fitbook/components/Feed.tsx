"use client";

import FitbookPostWithImage from "./feed/FitBookPostWithImage";

function Feed() {
  return (
    <div className="flex flex-col w-full pl-4 top-14">
      <Post /> 
      <div className="flex flex-col justify-center w-full px-4 ">
        <div className="p-4 my-2 border-2 rounded ">
          <div>
            <FitbookPostWithImage
              text="This is an example post on Instagram"
              username="example_user"
              imageUrl="https://www.sciencenews.org/wp-content/uploads/2022/04/042822_AG_dog-breeds_feats-1030x580.jpg" // Legg til bilde-URL for posten
            />
          </div>
          <h4>
            <b>Twitt</b>
          </h4>
          hi
        </div>
        <div className="p-4 my-2 border-2 rounded ">
          <h4>
            <b>Twitt</b>
          </h4>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis dolore
          aperiam aspernatur cumque veritatis quia aliquid sapiente quisquam
          sequi voluptatibus, eveniet, a corporis ab dolores cupiditate natus
          perspiciatis rerum est. Lorem, ipsum dolor sit amet consectetur
          adipisicing elit. Illo assumenda quasi nisi doloribus veniam inventore
          mollitia vero, dolore placeat in incidunt, quas dicta minima natus
          quia, adipisci iusto cum Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Nulla vero porro fuga a blanditiis rerum minima,
          repellat illo nostrum saepe, alias, harum error quidem sint provident
          nemo officia inventore laborum?
        </div>
        <div className="p-4 my-2 border-2 rounded ">
          <h4>
            <b>Twitt</b>
          </h4>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis dolore
          aperiam aspernatur cumque veritatis quia aliquid sapiente quisquam
          sequi voluptatibus, eveniet, a corporis ab dolores cupiditate natus
          perspiciatis rerum est.
        </div>
        <div className="p-4 my-2 border-2 rounded ">
          <h4>
            <b>Twitt</b>
          </h4>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis dolore
          aperiam aspernatur cumque veritatis quia aliquid sapiente quisquam
          sequi voluptatibus, eveniet, a corporis ab dolores cupiditate natus
          perspiciatis rerum est.
        </div>
        <div className="p-4 my-2 border-2 rounded ">
          <h4>
            <b>Twitt</b>
          </h4>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis dolore
          aperiam aspernatur cumque veritatis quia aliquid sapiente quisquam
          sequi voluptatibus, eveniet, a corporis ab dolores cupiditate natus
          perspiciatis rerum est.
        </div>
        <div className="p-4 my-2 border-2 rounded ">
          <h4>
            <b>Twitt</b>
          </h4>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis dolore
          aperiam aspernatur cumque veritatis quia aliquid sapiente quisquam
          sequi voluptatibus, eveniet, a corporis ab dolores cupiditate natus
          perspiciatis rerum est.
        </div>
        <div className="p-4 my-2 border-2 rounded ">
          <h4>
            <b>Twitt</b>
          </h4>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis dolore
          aperiam aspernatur cumque veritatis quia aliquid sapiente quisquam
          sequi voluptatibus, eveniet, a corporis ab dolores cupiditate natus
          perspiciatis rerum est.
        </div>
        <div className="p-4 my-2 border-2 rounded ">
          <h4>
            <b>Twitt</b>
          </h4>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis dolore
          aperiam aspernatur cumque veritatis quia aliquid sapiente quisquam
          sequi voluptatibus, eveniet, a corporis ab dolores cupiditate natus
          perspiciatis rerum est.
        </div>
      </div>
    </div>
  );
}

export default Feed;
