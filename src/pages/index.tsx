import LayoutWithNavbar from '@/layouts/LayoutWithNavbar';

export default function Home() {
	return <div>home</div>;
}

Home.getLayout = function getLayout(page: JSX.Element) {
	return <LayoutWithNavbar>{page}</LayoutWithNavbar>;
};

Home.title = 'Home';
