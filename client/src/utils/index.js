export const formatDate = (date) => {
  // Get the month, day, and year
  const month = date.toLocaleString("en-US", { month: "short" });
  const day = date.getDate();
  const year = date.getFullYear();

  const formattedDate = `${day}-${month}-${year}`;

  return formattedDate;
};

export function dateFormatter(dateString) {
  const inputDate = new Date(dateString);

  if (isNaN(inputDate)) {
    return "تاريخ غير صحيح";
  }

  const year = inputDate.getFullYear();
  const month = String(inputDate.getMonth() + 1).padStart(2, "0");
  const day = String(inputDate.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}

export function getInitials(fullName) {
  const names = fullName.split(" ");

  const initials = names.slice(0, 2).map((name) => name[0].toUpperCase());

  const initialsStr = initials.join("");

  return initialsStr;
}

export const PRIOTITYSTYELS = {
  high: "text-red-600",
  medium: "text-yellow-600",
  normal: "text-blue-600",
};

export const TASK_TYPE = {
  todo: "bg-blue-600",
  "in progress": "bg-yellow-600",
  completed: "bg-green-600",
};

export const BGS = [
  "bg-blue-600",
  "bg-yellow-600",
  "bg-red-600",
  "bg-green-600",
];
export const buldings = [
  {
    documnetNum: 23123243123, //  رقم الصك
    identityId: "لايوجد", // رقم الهويه العقاريه
    type: "غير محدد", //  نوع العقار
    usageType: "غير محدد", // نوع الاستخدام
    site: "غير محدد", //  الموقع
    district: "غير محدد", // الحي
    city: "غير محدد", // المدينه
    pieceNumber: 0, //  رقم القطعه
    reasone: "none", //   سبب التقييم
    _id: "67c9a3617911992d7cb53a74", //
    client: [
      //  الملاك
      {
        name: "saaad", //  اسم المالك
        nationalId: 234234234, //  رقم الهويه
        phone: "34234234234", //  الهاتف
        _id: "67ca0e09eaa1db2f5b3e9b20", //
        owingPercentage:10  // نسبه التمليك
      },
    ],
    activities: [
      {
        type: "البدأ",
        activity: "تم إدخال بيانات العقار و مالكه",
        date: "2025-03-06T13:29:56.787Z",
        by: {
          _id: "674ac558eef95f0341181ee8",
          name: "test",
        },
        _id: "67c9a3617911992d7cb53a76",
      },
      {
        type: "تعليق",
        activity: "this is comment",
        date: "2025-03-06T13:29:56.787Z",
        by: {
          _id: "674ac558eef95f0341181ee8",
          name: "test",
        },
        _id: "67c9a3f37911992d7cb53a82",
      },
    ],
    assets: [], //  صور العقار و صك الملكيه
    priceOffer: ["uploads\\pdf\\1741268231195-عرض سعر رقم 4473.pdf"], //  عرض الاسعار
    isTrashed: false,
    subTasks: [
      {
        title: "dsada",
        tag: "324234ds",
      },
    ],
    createdAt: "2025-03-06T13:30:09.855Z",
    updatedAt: "2025-03-06T21:05:13.013Z",
    size: 423, //مساحه العقار
  },
  {
    identityId: "لايوجد",
    type: "غير محدد",
    usageType: "غير محدد",
    site: "غير محدد",
    pieceNumber: 0,
    district: "غير محدد",
    city: "غير محدد",
    _id: "67c9a361sas7911992d7cb53a74",
    documnetNum: 23123243123,
    client: [
      {
        nationalId: 234234234,
        phone: 1233423,
        _id: "67ca0e09eaa1db2f5b3e9b20",
        name: "ammer",
        owingPercentage: 20,
      },
      {
        nationalId: 234234234,
        phone: 31234234234234,
        _id: "67ca0e09eaa1db2f5b3e9b20",
        name: "selim",
        owingPercentage: 20,
      },
    ],
    activities: [
      {
        type: "البدأ",
        activity: "تم إدخال بيانات العقار و مالكه",
        date: "2025-03-06T13:29:56.787Z",
        by: {
          _id: "674ac558eef95f0341181ee8",
          name: "test",
        },
        _id: "67c9a3617911992d7cb53a76",
      },
      {
        type: "تعليق",
        activity: "this is comment",
        date: "2025-03-06T13:29:56.787Z",
        by: {
          _id: "674ac558eef95f0341181ee8",
          name: "test",
        },
        _id: "67c9a3f37911992d7cb53a82",
      },
    ],
    assets: [],
    priceOffer: ["uploads\\pdf\\1741268231195-عرض سعر رقم 4473.pdf"],
    isTrashed: false,
    subTasks: [
      {
        title: "comment 1",
        tag: "",
      },
    ],
    createdAt: "2025-03-06T13:30:09.855Z",
    updatedAt: "2025-03-06T21:05:13.013Z",
    size: 423,
  },
  {
    identityId: "لايوجد",
    type: "غير محدد",
    usageType: "غير محدد",
    site: "غير محدد",
    pieceNumber: 0,
    district: "غير محدد",
    city: "غير محدد",
    _id: "67c21339a3617911992d7cb53a74",
    documnetNum: 23123243123,
    client: [
      {
        nationalId: 234234234,
        phone: "34234234234",
        _id: "67ca0e09eaa1db2f5b3e9b20",
        name: "saad",
        owingPercentage: 20,
      },
    ],
    activities: [
      {
        type: "البدأ",
        activity: "تم إدخال بيانات العقار و مالكه",
        date: "2025-03-06T13:29:56.787Z",
        by: {
          _id: "674ac558eef95f0341181ee8",
          name: "test",
        },
        _id: "67c9a3617911992d7cb53a76",
      },
      {
        type: "تعليق",
        activity: "this is comment",
        date: "2025-03-06T13:29:56.787Z",
        by: {
          _id: "674ac558eef95f0341181ee8",
          name: "test",
        },
        _id: "67c9a3f37911992d7cb53a82",
      },
    ],
    assets: [],
    priceOffer: ["uploads\\pdf\\1741268231195-عرض سعر رقم 4473.pdf"],
    isTrashed: false,
    subTasks: [],
    createdAt: "2025-03-06T13:30:09.855Z",
    updatedAt: "2025-03-06T21:05:13.013Z",
    size: 423,
  },
];
export const  singleBulding={
    documnetNum: 23123243123, //  رقم الصك
    identityId: "لايوجد", // رقم الهويه العقاريه
    type: "غير محدد", //  نوع العقار
    usageType: "غير محدد", // نوع الاستخدام
    site: "غير محدد", //  الموقع
    district: "غير محدد", // الحي
    city: "غير محدد", // المدينه
    pieceNumber: 0, //  رقم القطعه
    reasone: "none", //   سبب التقييم
    _id: "67c9a3617911992d7cb53a74", //
    client: [
      //  الملاك
      {
        name: "saaad", //  اسم المالك
        nationalId: 234234234, //  رقم الهويه
        phone: "34234234234", //  الهاتف
        _id: "67ca0e09eaa1db2f5b3e9b20", //
        owingPercentage:10  // نسبه التمليك
      },
    ],
    activities: [
      {
        type: "البدأ",
        activity: "تم إدخال بيانات العقار و مالكه",
        date: "2025-03-06T13:29:56.787Z",
        by: {
          _id: "674ac558eef95f0341181ee8",
          name: "test",
        },
        _id: "67c9a3617911992d7cb53a76",
      },
      {
        type: "تعليق",
        activity: "this is comment",
        date: "2025-03-06T13:29:56.787Z",
        by: {
          _id: "674ac558eef95f0341181ee8",
          name: "test",
        },
        _id: "67c9a3f37911992d7cb53a82",
      },
    ],
    assets: [], //  صور العقار و صك الملكيه
    priceOffer: ["uploads\\pdf\\1741268231195-عرض سعر رقم 4473.pdf"], //  عرض الاسعار
    isTrashed: false,
    subTasks: [
      {
        title: "dsada",
        tag: "324234ds",
      },
    ],
    createdAt: "2025-03-06T13:30:09.855Z",
    updatedAt: "2025-03-06T21:05:13.013Z",
    size: 423, //مساحه العقار
  }
