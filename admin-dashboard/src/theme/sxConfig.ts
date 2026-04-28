'use client';
export default {
  lineClamp: {
    style: (props: any) => ({
      display: '-webkit-box',
      WebkitLineClamp: String(props.lineClamp),
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden',
    }),
  },
};
