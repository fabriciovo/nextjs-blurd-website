
interface IStyledVideo {
    url: string;
}

export default function StyledVideo({ url }: IStyledVideo) {
    return (
        <div className="overflow-hidden relative p-20">
        <iframe
          width="640"
          height="320"
          src={`https://www.youtube.com/embed/${url}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Embedded youtube"
        />
      </div>
    );
}