import ProfileSection from './ProfileSection';
import { Info } from './styles';

interface Props {
	locked?: boolean;
}

const SubscriptionSection = ({ locked = false }: Props) => {
	return (
		<ProfileSection title='Subscription' locked={locked}>
			<Info>You have no active subscriptions.</Info>
		</ProfileSection>
	);
};

export default SubscriptionSection;
