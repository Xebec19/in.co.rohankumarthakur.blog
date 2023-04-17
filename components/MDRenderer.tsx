import React, { useEffect, useState } from "react";

const MDRenderer: React.FC<{ source: string }> = ({ source }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [post, setPost] = useState(null);

  const fetchPost = async () => {
    try {
      let response = await fetch(source);
      response = await response.text();
      console.log(response);
      setPost(response);
    } catch (error) {
      // todo notification
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPost();
  }, []);

  return <div>MDRenderer works!</div>;
};

export default React.memo(MDRenderer);
