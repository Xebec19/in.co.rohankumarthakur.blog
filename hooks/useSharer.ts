const useSharer = () => {
  const twitterSharer = (message: string, url: string, hashTags?: string[]) => {
    let link = `http://twitter.com/share?text=${message}&url=${url}`;
    if (hashTags && hashTags.length > 0 && typeof hashTags == "object") {
      link += `&hashtags=${hashTags.join(",")}`;
    }

    window.open(link, "_blank");
  };

  const customSharer = (title: string, message: string, url: string) => {
    if (navigator.share) {
      navigator
        .share({ title: `${title}`, url: `${url}`, text: `${message}` })
        .then(() => {
          console.log("Shared");
        })
        .catch(console.error);
    } else {
      navigator.clipboard.writeText(url).then(() => {
        alert("Copied to clipboard");
      });
    }
  };

  return { twitterSharer, customSharer };
};

export default useSharer;
