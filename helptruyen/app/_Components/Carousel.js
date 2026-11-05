"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import BackGround from "./BackGround";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";

// const images = [
//   {
//     id: 1,
//     img: "/bg.jpg",
//     name: "Gachiakuta",
//     title: `Rudo sinh ra trong một khu ổ chuột bị kỳ thị và ghét bỏ . Những
//             tưởng mọi thứ đang tốt đẹp thì bỗng dưng một ngày nọ, Regto bị một
//             kẻ lạ mặt sát hại.`,
//     book: "/notbg.jpg",
//   },
//   {
//     id: 2,
//     img: "/bg-2.jpg",
//     name: "JoJo's Bizarre Adventure Part 6: Stone Ocean",
//     title: `Chào mừng đến với Vladivostok, thủ phủ vùng liên bang Viễn Đông, L.B.Nga. "Moscow Calling" kể về Georgiy Lastochkin, một sinh viên 18 tuổi. Sống ở Vladivostok, cậu học tại một trường đại học địa phương.
// Một ngày nọ, cậu bắt đầu hành trình của mình đi khắp nước Nga, hành trình từ Vladivostok đến tận Moskva!`,
//     book: "/notbg-2.jpg",
//   },
//   {
//     id: 3,
//     img: "/bg-3.jpg",
//     name: "Metaphor: ReFantazio Retold",
//     title: `Dịch lại truyện vì team Valkyrie đã drop
// sẵn tiện remake lại chap 1 và 2`,
//     book: "/notbg-6.jpg",
//   },
//   {
//     id: 4,
//     img: "/bg-4.jpg",
//     name: "Nàng Dâu nhà họ Kyougane",
//     title: `Dòng họ Kyougane - danh gia vọng tộc diệt ma kéo dài suốt ngàn năm. Được đưa đến trước mặt vị đương chủ hiện tại lắm tài nhiều tật - Kyougane Kurou, là một cô dâu mang vẻ ngoài kiều diễm nhưng "bí mật" ẩn sau vẻ đẹp đó đó rốt cuộc là gì!?`,

//     book: "/notbg-3.jpg",
//   },
//   {
//     id: 5,
//     img: "/bg-5.jpg",
//     name: "Phán Quyết của ASURA",
//     title:
//       "Con chỉ được làm những việc tốt thôi nhé.”—Asura làm theo lời dạy của người mẹ quá cố và luôn cố gắng làm điều tốt trong cuộc sống, cho dù có bị bắt nạt đến mức nào, cậu vẫn mỉm cười và tin chắc rằng những kẻ làm điều ác sẽ phải nhận sự trừng phạt của ông trời. Vào một đêm nọ, một lão già đáng ngờ đã đưa cho cậu chiếc chìa khóa có thể mở cánh cửa âm phủ...",
//     book: "/notbg-4.jpg",
//   },
//   {
//     id: 6,
//     img: "/bg-6.jpg",
//     name: "Đôi ta giữa đêm dài",
//     title: `Chuyện kể về Saitou Kou, một nghiên cứu sinh cao học luôn khổ sở vì chứng mất ngủ, và Ichijou Yoiko, người mất ngủ vì nỗi cô đơn sau khi trở thành một freelancer.

// Khi cả hai nhận ra gen ngủ có tên "Hợp hoan tử" của bản thân tương thích với người còn lại, họ bắt đầu thí nghiệm sống chung để tìm lại giấc ngủ ổn định. Dẫu vẫn còn nhiều e ngại, hai người vẫn cùng nằm chung một giường, rồi chìm vào giấc ngủ mà đã bao năm trôi qua, họ vẫn chưa từng được nếm trải…

// Và từ đó mở ra câu chuyện mới cho đôi nam nữ vụng về ấy.`,
//     book: "/notbg-5.jpg",
//   },
// ];

export default function Carousel({newMangas, collapsedNumWords}) {
  const [current, setCurrent] = useState(0);
  function next() {
    setCurrent((prev) => (prev + 1) % newMangas.length);
  }

  function prev() {
    setCurrent((prev) => (prev - 1 + newMangas.length) % newMangas.length);
  }

  useEffect(() => {
  const timer = setInterval(() => {
    setCurrent((prev) => (prev + 1) % newMangas.length);
  }, 5000);

  return () => clearInterval(timer);
}, [current]);

  return (
    <div className="relative w-full overflow-hidden">
      {/* Track */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(-${current * 100}%)`,
        }}
      >
        {newMangas.map((image, index) => (
          <div key={image.id} className="min-w-full md:h-80  lg:h-160 h-60 ">
            <div
              className="relative min-w-full md:h-80 lg:h-160 h-60"
            >
              <Image
                src={image.mangas.image_background}
                alt={`Image ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
            <BackGround image={image.mangas.image_main} title={image.mangas.description} name={image.mangas.title} collapsedNumWords={collapsedNumWords} mangas_id={image.mangas_id}/>
          </div>
        ))}
      </div>

      {/* Buttons */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black-50/70 px-3 py-3 rounded-[240px] transition-all hover:px-4 hover:py-4 "
      >
        <ChevronLeftIcon width={32} height={32} color="white" />
      </button>

      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black-50/70 px-3 py-3 rounded-[240px] transition-all hover:px-4 hover:py-4"
      >
        <ChevronRightIcon width={32} height={32} color="white" />
      </button>
    </div>
  );
}
