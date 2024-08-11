import Image from "next/image";

const Gallery = ({ columns, cropImages, items }) => {
  let maxHeight = 0;
  let maxWidth = 0;

  if (cropImages) {
    items.forEach(element => {
      if (element.attributes.height > maxHeight) {
        maxHeight = element.attributes.height;
      }
      if (element.attributes.width > maxWidth) {
        maxWidth = element.attributes.height;
      }
    });
  }

  const columnWidth = 100 / columns;
  return (
    <div className="flex flex-wrap max-w-5xl mx-auto">
      {items.map(item => (
        <div key={item.id} style={{ width: `${columnWidth}%` }} className="p-5 flex-grow">
          <Image src={item.attributes.url} height={item.attributes.height} width={item.attributes.width} alt={item.attributes.alt} />
        </div>
      ))}
    </div>
  )
}

export default Gallery